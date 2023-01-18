// here is where music will be fetched
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { type PlaylistRefactored, type PlaylistResponse, refactorPlaylist } from "../../../constants/music.constants";
import { z } from "zod";


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

  // fetch playlist function including refactoring playlist response to match ZOD schema for Prisma
const fetch_PLAYLIST = async () => {
  try {
    // fetch playlist data 
    const recentlyAdded = await fetch(
      `${SoundCloud_Scraper_API_Playlist_URL}${RECENTLY_ADDED_PLAYLIST_ID}`,
      options
    );
    const recommended = await fetch(
      `${SoundCloud_Scraper_API_Playlist_URL}${RECOMMENDED_PLAYLIST_ID}`,
      options
    );

    // jsonify playlist data as PlaylistResponse
    const recentlyAddedJson = await recentlyAdded.json() satisfies PlaylistResponse;
    const recommendedJson = await recommended.json() satisfies PlaylistResponse;

    // refactor playlists as PlaylistRefactored to match Prisma schema
    const recentlyAddedRefactored = await refactorPlaylist(recentlyAddedJson) 
    const recommendedRefactored = await refactorPlaylist(recommendedJson)
    // return refactored playlists
    console.log('running');
    return [recentlyAddedRefactored, recommendedRefactored];
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      cause: err
    });
  }
};


// ROUTER TO GET MUSIC
export const GETMusicRouter = router({

  // query to get playlists
  GETmusicProcedure: publicProcedure.query(async ({ctx}) => {
    try {
            // fetch playlists from soundcloud scraper api
      const [recentlyAdded, recommended] = await fetch_PLAYLIST();
            // if playlists are undefined, throw error
      if (!recentlyAdded || !recommended) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "GETmusicProcedure issue, Playlists not found",
        });
      }
                // return playlists
      return [recentlyAdded, recommended];
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: err,
        message: 'GETmusicProcedure issue'
        
      });
    }
  }
  ),
  
  getPlaylist: publicProcedure.input(z.number()).query( ({ ctx, input }) => {
    // get prisma client
    const { prisma } = ctx;
    // if playlist is undefined, throw error  
    if (!prisma) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Playlist not found",
      });
    }
    // find playlist from prisma client
    const playlist = prisma.playlist.findUnique({
      where: {
        id: input,
      },
      include: {
        tracks: true,
      }
    });
    
    // return playlist
    return playlist;
  })

});

