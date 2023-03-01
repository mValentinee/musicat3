import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import {
  type PlaylistResponse,
  refactorPlaylist,
} from "../../../schemas/music.schemas";
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
    const recentlyAddedJson =
      (await recentlyAdded.json()) satisfies PlaylistResponse;
    const recommendedJson =
      (await recommended.json()) satisfies PlaylistResponse;

    // refactor playlists as PlaylistRefactored to match Prisma schema
    const recentlyAddedRefactored = await refactorPlaylist(recentlyAddedJson);
    const recommendedRefactored = await refactorPlaylist(recommendedJson);
    // return refactored playlists
    return [recentlyAddedRefactored, recommendedRefactored];
  } catch (err) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      cause: err,
    });
  }
};

// ROUTER TO GET MUSIC
export const PlaylistRouter = router({
  // fetch playlist from external API, use for testing
  FetchPlaylistFromExternalAPI: publicProcedure.query(async () => {
    try {
      // fetch playlists from soundcloud scraper api
      const [recentlyAdded, recommended] = await fetch_PLAYLIST();
      // if playlists are undefined, throw error
      if (!recentlyAdded || !recommended) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "FetchMusic issue, Playlists undefined",
        });
      }
      // return playlists
      return [recentlyAdded, recommended];
    } catch (err) {
      console.error(err);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: err,
        message: "FetchMusic issue from catch block",
      });
    }
  }),

  // check if playlist exist in database, if not, create them by fetching them from external API
  FetchAndCreatePlaylist: publicProcedure.mutation(async ({ ctx }) => {
    try {
      const { prisma } = ctx;
      // if playlist do not exist in database, create them
      const playlistCount = await prisma.playlist.count();
      if (playlistCount === 0) {
        // fetch playlists from soundcloud scraper api
        const [recentlyAdded, recommended] = await fetch_PLAYLIST();
        // if playlists are undefined, throw error
        if (!recentlyAdded || !recommended) {
          throw new TRPCError({
            code: "PARSE_ERROR",
            message: "Fetched Playlist Are Undefined",
          });
        }
        // add playlist to database
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

      // if playlist exist in database, return them
      const playlists = await prisma.playlist.findMany({
        include: {
          tracks: true,
        },
      });
      return playlists;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Fetch and Create Playlist Issue",
      });
    }
  }),
  // get indivudual playlist from database
  getPlaylist: publicProcedure.input(z.number()).query(({ ctx, input }) => {
    // get prisma client
    const { prisma } = ctx;

    // find playlist from prisma client
    const playlist = prisma.playlist.findUnique({
      where: {
        id: input,
      },
      include: {
        tracks: true,
      },
    });

    // if playlist is undefined, throw error
    if (playlist === undefined || null)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Playlist not found in database",
      });

    // return playlist
    return playlist;
  }),
});
