import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Image from "next/image";
import { Play } from "iconsax-react";
import { useState } from "react";

// TYPE to represent tracks in playlist array
type Tracks = {
  id: number;
  permalink: string;
  title: string;
  artworkUrl: string;
  waveformUrl: string;
  stationPermalink: string;
};

// type Tracks = {
//   [id: number]: {
//     id: number;
//     permalink: string;
//     title: string;
//     artworkUrl: string;
//     waveformUrl: string;
//     stationPermalink: string;
//   }[];
// };

// function to play music onclick of play button
const playMusic = (url: string) => {
  const audio = new Audio(url);
  audio.play();
};

// markup for music card. putting each track in a card with image and title in a column. on hover, show play button
// const MusicCard = ({ track }: { track: Tracks }) => {
//   return (
//     <div className="">
//       <div className="relative h-[180px] w-[180px] overflow-hidden rounded-3xl hover:translate-y-0.5">
//         <Image fill src={track.artworkUrl} alt={track.artworkUrl} />
//       </div>
//       <div className=" flex flex-col items-center gap-1">
//         <p className="text-center text-sm font-bold sm:text-left">
//           {track.title}
//         </p>
//       </div>
//     </div>
//   );
// };

const MusicCard = ({ track }: { track: Tracks }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-3xl hover:translate-y-0.5 md:shrink-0"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && (
        <div className="bg-opacity-1 absolute inset-0 flex items-center justify-center bg-black">
          <button className="rounded-full bg-white p-3 text-black hover:bg-gray-200">
            <Play size="25" color="#000000" variant="Bold" />
          </button>
        </div>
      )}
      <div
        className="md:h-50 relative h-[180px] w-[180px] overflow-hidden  rounded-3xl md:w-full
      "
      >
        <Image fill src={track.artworkUrl} alt={track.artworkUrl} />
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-center text-sm font-bold sm:text-center">
          {track.title}
        </p>
      </div>
    </div>
  );
};

// markup for music card, putting each track in a card with image and title in a column. on hover, show play button on hover. Only show 8 tracks at a time
// const MusicCardGrid = ({ track }: { track: Tracks[] }) => {
//   const [isHovering, setIsHovering] = useState(false);

//   return (
//     <div>
//       {track
//         .filter((_, index) => index < 8)
//         .map((track) => (
//           <div
//             className="relative overflow-hidden rounded-3xl hover:translate-y-0.5"
//             onMouseEnter={() => setIsHovering(true)}
//             onMouseLeave={() => setIsHovering(false)}
//             key={track}
//           >
//             {isHovering && (
//               <div className="bg-opacity-1 absolute inset-0 flex items-center justify-center bg-black">
//                 <button className="rounded-full bg-white p-3 text-black hover:bg-gray-200">
//                   <Play size="25" color="#000000" variant="Bold" />
//                 </button>
//               </div>
//             )}
//             <div className="relative h-[180px] w-[180px] overflow-hidden rounded-3xl md:shrink-0">
//               <Image fill src={track.artworkUrl} alt={track.artworkUrl} />
//             </div>

//             <div className="flex flex-col items-center gap-1">
//               <p className="text-center text-sm font-bold sm:text-center">
//                 {track.title}
//               </p>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

export const RecentlyAddedPlaylist: NextPage = () => {
  // use trpc router to get playlist
  const { data, isLoading } = trpc.playlist.getPlaylist.useQuery(1);
  const tracks = data?.tracks;

  return (
    <div className="">
      <h1 className="mb-1 pl-2 text-3xl font-bold">Recently Added</h1>
      <div className="mb-auto columns-8 flex-col">
        {isLoading
          ? "Loading..."
          : tracks
              ?.filter((_, index) => index < 8)
              .map((track) => {
                return <MusicCard key={track.id} track={track} />;
              })}
      </div>
    </div>
  );
};
export const RecommendedPlaylist: NextPage = () => {
  // use trpc router to get playlist
  const { data, isLoading } = trpc.playlist.getPlaylist.useQuery(2);
  const tracks = data?.tracks;

  return (
    <div className="">
      <h1 className="mb-1 pl-2 text-3xl font-bold">Recommended</h1>
      <div className="mb-auto columns-8 flex-col">
        {isLoading
          ? "Loading..."
          : tracks
              ?.filter((_, index) => index < 8)
              .map((track) => {
                return <MusicCard key={track.id} track={track} />;
              })}
      </div>
    </div>
  );
};

// {<div className="relative col-span-8 mx-auto w-[95%] max-w-md flex-auto justify-end overflow-hidden rounded-3xl p-3 md:col-span-8 md:w-full md:max-w-2xl md:pr-8">
//       <div className="md:flex">
//         <div className="relative h-[180px] w-[180px] overflow-hidden rounded-3xl md:shrink-0">
//           <Image fill src={track.artworkUrl} alt={track.artworkUrl} />
//         </div>
//         <div className=" flex flex-col items-center gap-1">
//           <p className="text-center text-sm font-bold sm:text-left">
//             {track.title}
//           </p>
//         </div>
//         {/* <div className="hover:only: relative h-[100px] w-[100px]">
//           <Image src="/play-button.png" alt="play" fill />
//         </div> */}
//       </div>
//     </div>
