import { type NextPage } from "next";
import { useState } from "react";
import { trpc } from "../utils/trpc";

// TYPE to represent tracks in playlist array
type Tracks = {
  id: number;
  permalink: string;
  title: string;
  artworkUrl: string;
  waveformUrl: string;
  stationPermalink: string;
};

const ProgressBar = () => {
  return <div>ProgressBar content here</div>;
};

const Controls = () => {
  return <div>Controls content here</div>;
};

const DisplayTrack = ({ currentTrack }: { currentTrack: Tracks }) => {
  return (
    <div>
      <audio src="" />
    </div>
  );
};

export const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState({});
  const {
    data: tracks,
    isLoading,
    error,
  } = trpc.playlist.getPlaylist.useQuery(1);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (!tracks) {
    return <div>No tracks</div>;
  }

  const singleTrack = tracks.tracks[0] as Tracks;

  return (
    <div>
      <div>
        <DisplayTrack currentTrack={singleTrack} />
        <Controls />
        <ProgressBar />
      </div>
    </div>
  );
};
