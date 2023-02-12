import { router } from "../trpc";
import { PlaylistRouter } from "./playlistProcedures";

export const appRouter = router({
  playlist: PlaylistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
