// here is where music will be fetched
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { PlaylistResponse } from "../../../constants/music.constants";
import { PlaylistRefactored } from "../../../constants/music.constants";

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
    return recentlyAdded;
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: (err as any).message,
    });
  }
};

export const musicRouter = router({
  getRecentlyAdded: publicProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    // check if playlist exists in db
    if (!prisma.playlist) {
      // if not, fetch playlist from soundcloud scraper api
      const fetchedPlaylist = await fetch_RECENTLYADDED_PLAYLIST();

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
      // push refactored playlist to db and return it to client
      return await prisma.playlist.create({
        data: refactorPlaylist(fetchedPlaylist),
      });
    } else {
      // if playlist exists in db, return it to client
      return await prisma.playlist.findUnique({ where: { playlistID: 1 } });
    }
  }),
});

//Maybe an alternative would be not to use trpc's generated useQuery and instead use useQuery directly calling trpc's generated query function for the data myself
