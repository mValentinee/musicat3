// here is where music will be fetched
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { type PlaylistResponse } from "../../../constants/music.constants";
import { type PlaylistRefactored } from "../../../constants/music.constants";

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
const recently_Added_Playlist_Id = "%2Fv-val-1%2Fsets%2Fmusicarecentlyadded";

// fetch playlist function
const fetch_RECENTLYADDED_PLAYLIST = async () => {
  try {
    // fetch playlist data
    const res = await fetch(
      `${SoundCloud_Scraper_API_Playlist_URL}${recently_Added_Playlist_Id}`,
      options
    );
    const recentlyAdded = (await res.json()) as PlaylistResponse;
    // create function to refactor fetched playlist data to match type PlaylistRefactored
    const refactorPlaylist = (
      playlist: PlaylistResponse
    ): PlaylistRefactored => {
      const refactoredPlaylist = {
        playlistID: playlist.playlistID,
        tracks: playlist.tracks.items,
      };
      return refactoredPlaylist;
    };
    // return refactored playlist data
    return refactorPlaylist(recentlyAdded);
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (err as any).message,
    });
  }
};

export const musicRouter = router({
  getRecentlyAdded: publicProcedure.query(async ({ ctx }) => {
    // get prisma client
    const { prisma } = ctx;
    // get playlist from db
    const playlist = await prisma.playlist.findUnique({ where: { id: 1 } });
    // if playlist is empty, fetch playlist from soundcloud scraper api
    if (!playlist) {
      // if not, fetch playlist from soundcloud scraper api
      const fetchedPlaylist = await fetch_RECENTLYADDED_PLAYLIST();

      // push refactored playlist to db and return it to client
      return await prisma.playlist.create({
        // create playlist in db matching type PlaylistRefactored
        data: {
          id: 1,
          playlistID: fetchedPlaylist.playlistID,
          tracks: {
            create: fetchedPlaylist.tracks,
          },
        },
        // include tracks in playlist
        include: {
          tracks: true,
        },
      });
    }
    // if playlist exists in db, return it to client
    return await playlist;
  }),
});

//Maybe an alternative would be not to use trpc's generated useQuery and instead use useQuery directly calling trpc's generated query function for the data myself
