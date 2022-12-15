import { router } from "../trpc";
import { musicRouter } from "./music";

export const appRouter = router({
  getMusic: musicRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
