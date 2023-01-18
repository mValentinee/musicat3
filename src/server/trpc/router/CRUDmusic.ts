import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { type PlaylistRefactored } from "../../../constants/music.constants";
import { TRPCError } from "@trpc/server";

export const CRUDMusicRouter = router({
  // pass GETmusic router as input to CRUDmusic router
  crudMusic: publicProcedure
    .input(
      z.object({
        recentlyAdded: z.object({
          playlistID: z.number(),
          tracks: z.array(
            z.object({
              id: z.number(),
              permalink: z.string(),
              title: z.string(),
              artworkUrl: z.string(),
              waveformUrl: z.string(),
              stationPermalink: z.string(),
            })
          ),
        }),
        recommended: z.object({
          playlistID: z.number(),
          tracks: z.array(
            z.object({
              id: z.number(),
              permalink: z.string(),
              title: z.string(),
              artworkUrl: z.string(),
              waveformUrl: z.string(),
              stationPermalink: z.string(),
            })
          ),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // get prisma client
      const { prisma } = ctx;

      // create playlist in prisma client

      // if input has playlist data, create playlist in prisma client
      if (!input) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Playlist not found",
        });
      }

      // create playlist in prisma client
      const createdRecentlyAdded = await prisma.playlist.create({
        data: {
          playlistID: input.recentlyAdded.playlistID,
          tracks: {
            create: input.recentlyAdded.tracks,
          },
        },
        include: {
          tracks: true,
        },
      });
      const createdRecommended = await prisma.playlist.create({
        data: {
          playlistID: input.recommended.playlistID,
          tracks: {
            create: input.recommended.tracks,
          },
        },
        include: {
          tracks: true,
        },
      });

      // return playlists
      return [createdRecentlyAdded, createdRecommended];
    }),
});
