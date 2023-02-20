import { type NextPage } from "next";
import { trpc } from "../utils/trpc";
import Image from "next/image";

// type to represent tracks in playlist
type Tracks = {
  id: number;
  permalink: string;
  title: string;
  artworkUrl: string;
  waveformUrl: string;
  stationPermalink: string;
};

// markup for music card. putting each track in a card with image and title in a column. on hover, show play button
const MusicCard = ({ track }: { track: Tracks }) => {
  return (
    <div className="">
      <div className="relative h-[180px] w-[180px] overflow-hidden rounded-3xl">
        <Image fill src={track.artworkUrl} alt={track.artworkUrl} />
      </div>
      <div className=" flex flex-col items-center gap-1">
        <p className="text-center text-sm font-bold sm:text-left">
          {track.title}
        </p>
      </div>
    </div>
  );
};

const RecentlyAddedPlaylist: NextPage = () => {
  // use trpc router to get playlist
  const { data, isLoading } = trpc.playlist.getPlaylist.useQuery(1);
  const tracks = data?.tracks;
  console.log(tracks);

  return (
    <div className="relative col-span-8 mx-auto w-[95%] p-3 md:col-span-8 md:w-full md:pr-8">
      <h1 className="mb-1 pl-2 text-3xl font-bold">Recently Added</h1>
      <div className="flex columns-8 gap-5">
        {isLoading
          ? "Loading..."
          : tracks?.map((track: Tracks) => {
              return <MusicCard key={track.id} track={track} />;
            })}
      </div>
    </div>
  );
};

export default RecentlyAddedPlaylist;
