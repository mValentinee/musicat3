import { router } from "../trpc";
import { GETMusicRouter } from "./GETmusic";
import { CRUDMusicRouter } from "./CRUDmusic";

export const appRouter = router({
  GETmusic: GETMusicRouter,
  CRUDmusic: CRUDMusicRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
