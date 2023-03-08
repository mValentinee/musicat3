import Image from "next/image";
import { Play, Heart, MusicPlay } from "iconsax-react";
import { useQuery } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import React from "react";

// TYPE to represent tracks in playlist array
type Tracks = {
  id: number;
  permalink: string;
  title: string;
  artworkUrl: string;
  waveformUrl: string;
  stationPermalink: string;
};

// functionalilty to play music
// custom hook to fetch stream url from soundcloud api
//   const useGetStreamUrl = (trackId: number) => {
//     const { data, isLoading, error } = useQuery(
//       ["streamUrl", trackId],
//       async () => {
//         const res = await fetch(
//           `https://api.soundcloud.com/tracks/${trackId}/streams`,
//           { headers: { accept: "application/json; charset=utf-8" } }
//         );
//         const data = await res.json();
//         return data;
//       }
//     );
//     return { data, isLoading, error };
//   };

//   // function to play music onclick of play button
//   const UsePlayMusic = (url: number) => {
//     // const { data } = useGetStreamUrl(url);
//     // console.log(data);
//     // const audio = new Audio();
//     // audio.play();
//     alert("issue with soundcloud api");
//   };

const MusicCard = ({ track }: { track: Tracks }) => {
  return (
    <div
      className="text-s mr-[30px] w-[153px] flex-shrink-0 hover:translate-y-0.5"
      // onClick={handleClick}
      key={track.id}
    >
      <div className="group relative">
        <Image
          src={track.artworkUrl}
          alt={track.title}
          height={180}
          width={180}
          className=" mr-[1.875rem] mb-1 rounded-3xl group-hover:opacity-[50%] group-hover:shadow-2xl group-hover:shadow-orange-600"
        />
        <div className="invisible group-hover:visible">
          <button
            type="button"
            // onClick={() => UsePlayMusic(track.id)}
          >
            <Play
              size="2.5rem"
              className="bg- absolute top-[25%] left-[25%] text-zinc-900"
            />
          </button>
          <button>
            <Heart
              size="2.5rem"
              className="absolute top-[25%] right-[25%] text-red-800"
            />
          </button>
          <p className="visible text-xs text-slate-900 ">{track.title}</p>
        </div>
      </div>
    </div>
  );
};

// const MusicCard = ({ track }: { track: Tracks }) => {
//
//   return (
//     <div className=" relative overflow-hidden rounded-3xl text-white hover:translate-y-0.5 hover:bg-orange-700 hover:bg-opacity-[80%]  md:shrink-0">
//       <div
//         className="md:h-50  group relative h-[180px]  w-[180px] overflow-hidden rounded-3xl md:w-full
//       "
//       >
//         <Image fill sizes="" src={track.artworkUrl} alt={track.artworkUrl} />
//         <button
//           type="button"
//           className=" invisible absolute inset-11 active:outline-emerald-900 group-hover:visible
//         "
//           onClick={() => UsePlayMusic(track.id)}
//         >
//           <Play size="5rem" color="#F3EEFF" />
//         </button>
//       </div>
//       <div className="flex flex-col items-center gap-1">
//         <p className=" text-center text-sm sm:text-center ">{track.title}</p>
//       </div>
//     </div>
//   );
// };

export const RecentlyAddedPlaylist = () => {
  // use trpc router to get playlist
  const { data, isLoading } = trpc.playlist.getPlaylist.useQuery(1);
  const tracks = data?.tracks || [];

  return (
    <div className="mb-6 flex flex-nowrap overflow-x-scroll">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      ) : (
        tracks
          .filter((_, index) => index < 8)
          .map((track) => {
            return <MusicCard key={track.id} track={track} />;
          })
      )}
    </div>
  );
};
export const RecommendedPlaylist = () => {
  // use trpc router to get playlist
  const { data, isLoading } = trpc.playlist.getPlaylist.useQuery(2);
  const tracks = data?.tracks || [];

  return (
    <div className="mb-6 flex flex-nowrap overflow-x-scroll">
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      ) : (
        // filter 8 tracks randomly from playlist
        tracks
          .filter((track, index) => index < 8)
          .map((track) => {
            return <MusicCard key={track.id} track={track} />;
          })
      )}
    </div>
  );
};
// <div className="">
//   <h1 className=" mb-1 pl-2 text-lg font-bold text-zinc-50">
//     Recommended.
//   </h1>
//   <div className=" mb-auto columns-8 flex-col">
//     {isLoading ? (
//       <div className="flex items-center justify-center">
//         <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
//       </div>
//     ) : (
//       tracks
//         .filter((_, index) => index < 8)
//         .map((track) => {
//           return <MusicCard key={track.id} track={track} />;
//         })
//     )}
//   </div>
// </div>
