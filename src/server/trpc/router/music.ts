// here is where music will be fetched
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { type PlaylistResponse } from "../../../constants/music.constants";
import { type PlaylistRefactored } from "../../../constants/music.constants";
import { type } from "os";

// header options
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "55b9fe8337mshc0ef62c754536fdp12ececjsn0db06744573e",
    "X-RapidAPI-Host": "soundcloud-scraper.p.rapidapi.com",
  },
};

// soundcloud Scraper API From RapidAPI
const SoundCloud_Scraper_API_Playlist_URL =
  "https://soundcloud-scraper.p.rapidapi.com/v1/playlist/tracks?playlist=https%3A%2F%2Fsoundcloud.com";
// playlist ID(s)
const RECENTLY_ADDED_PLAYLIST_ID = "%2Fv-val-1%2Fsets%2Fmusicarecentlyadded";
const RECOMMENDED_PLAYLIST_ID =
  "%2Fhotsince-82%2Fsets%2Fknee-deep-in-november-2";
// fetch playlist function includes refactoring playlist response
const fetch_PLAYLIST = async () => {
  try {
    // batch fetch both recently added and recommended playlists
    const [recentlyAdded, recommended] = await Promise.all([
      // fetch playlist data
      fetch(
        `${SoundCloud_Scraper_API_Playlist_URL}${RECENTLY_ADDED_PLAYLIST_ID}`,
        options
      ),
      fetch(
        `${SoundCloud_Scraper_API_Playlist_URL}${RECOMMENDED_PLAYLIST_ID}`,
        options
      ),
    ]);
    // jsonify playlist data as PlaylistResponse
    const recentlyAddedJson = {
      recentlyAdded: (await recentlyAdded.json()) as PlaylistResponse,
    };
    const recommendedJson = {
      recommended: (await recommended.json()) as PlaylistResponse,
    };
    // function to refactor PlaylistResponse as PlaylistRefactored
    const refactorPlaylist = (
      playlist: PlaylistResponse
    ): PlaylistRefactored | undefined => {
      // if playlist is undefined, return undefined
      if (!playlist) return undefined;

      // return refactored playlist
      return {
        id: playlist.playlistID,
        playlistID: playlist.playlistID,
        tracks: playlist.tracks.items,
      };
    };

    // refactor playlists as PlaylistRefactored
    const recentlyAddedRefactored = refactorPlaylist(
      recentlyAddedJson.recentlyAdded
    );
    const recommendedRefactored = refactorPlaylist(recommendedJson.recommended);
    // return refactored playlists
    return [recentlyAddedRefactored, recommendedRefactored];
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",

      message: (err as any).message,
    });
  }
};

// ROUTER TO GET MUSIC
export const musicRouter = router({
  getMusic: publicProcedure.query(async ({ ctx }) => {
    // get prisma client
    const { prisma } = ctx;
    // find playlists from prisma client
    const playlists = await prisma.playlist.findMany({
      include: {
        tracks: true,
      },
    });
    // if playlists are empty, fetch playlists from soundcloud scraper api
    if (playlists.length === 0) {
      // fetch playlists from soundcloud scraper api
      const [recentlyAdded, recommended] = await fetch_PLAYLIST();
      // if playlist is undefined, return undefined
      if (!recentlyAdded || !recommended) {
        throw console.error("Error: Playlist is undefined");
      }
      // post playlists to prisma client
      const createdRecentlyAdded = await prisma.playlist.create({
        data: {
          playlistID: recentlyAdded.playlistID,
          tracks: {
            create: recentlyAdded.tracks,
          },
        },
        include: {
          tracks: true,
        },
      });
      const createdRecommended = await prisma.playlist.create({
        data: {
          playlistID: recommended.playlistID,
          tracks: {
            create: recommended.tracks,
          },
        },
        include: {
          tracks: true,
        },
      });
      // return playlists
      return [createdRecentlyAdded, createdRecommended];
    }
    // return playlists
    return playlists;
  }),
});

//Maybe an alternative would be not to use trpc's generated useQuery and instead use useQuery directly calling trpc's generated query function for the data myself
