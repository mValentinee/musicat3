import { z } from "zod";

// zod schema for playlist response that comes from soundcloud scraper api
const PlaylistResponse = z.object({
  playlistID: z.number(),
  tracks: z.object({
    items: z.array(
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
});

// zod schema for refactored playlist response
const PlaylistRefactored = z.object({
  id: z.number(),
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
});

export type PlaylistResponse = z.infer<typeof PlaylistResponse>;
export type PlaylistRefactored = z.infer<typeof PlaylistRefactored>;

// const PlaylistResponse = z.object({
//   playlistID: z.number(),
//   tracks: z.object({
//     items:
//       z.array[
//         z.object({
//           id: z.number(),
//           permalink: z.string(),
//           title: z.string(),
//           artworkUrl: z.string(),
//           waveformUrl: z.string(),
//           stationPermalink: z.string(),
//         })
//       ],
//   }),
// });
/*
let cats: Cat[] = [];

const Cat = z.object({
    id: z.number(),
    name: z.string(),
});
const Cats = z.array(Cat);

...

export type Cat = z.infer<typeof Cat>;
export type Cats = z.infer<typeof Cats>;
*/
