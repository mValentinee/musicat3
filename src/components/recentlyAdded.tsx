import { type NextPage } from "next";
import { trpc } from "../utils/trpc";

const RecentlyAddedPlaylist: NextPage = () => {
  // type to represent tracks in playlist
  type Tracks = {
    id: number;
    permalink: string;
    title: string;
    artworkUrl: string;
    waveformUrl: string;
    stationPermalink: string;
  };

  // markup for music card
  const MusicCard = ({ track }: { track: Tracks }) => {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="relative h-[200px] w-[200px]">
          <Image />
        </div>
      </div>
    );
  };

  // use trpc router to get playlist
  const { data, isLoading } = trpc.playlist.getPlaylist.useQuery(1);
  const tracks = data?.tracks;

  return (
    <>
      <title>Recently Added</title>
      <div>
        {isLoading
          ? "Loading..."
          : tracks?.map((track: Tracks) => {
              return <div key={track.id}>{track.title}</div>;
            })}
      </div>
    </>
  );
};

export default RecentlyAddedPlaylist;
