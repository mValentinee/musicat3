// here is where music will be fetched
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";

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

type PlaylistType = {
  playlistID: number;
  tracks: {
    items: [
      {
        id: number;
        permalink: string;
        title: string;
        artworkUrl: string;
        waveformUrl: string;
        stationPermalink: string;
      }
    ];
  };
};

// fetch playlist function
// const fetchPlaylist = async () => {
//   try {
//     // fetch playlist data
//     const res = await fetch(
//       `${SoundCloud_Scraper_API_Playlist_URL}${recently_Added_Playlist_Id}`,
//       options
//     );

//     const recentlyAdded = (await res.json()) as PlaylistType;
//     return recentlyAdded;
//   } catch (err) {
//     throw new TRPCError({
//       code: "INTERNAL_SERVER_ERROR",
//       message: (err as any).message,
//     });
//   }
// };

export const musicRouter = router({
  getRecentlyAdded: publicProcedure.query(async ({ ctx, input }) => {
    return;
  }),
});

//Maybe an alternative would be not to use trpc's generated useQuery and instead use useQuery directly calling trpc's generated query function for the data myself
