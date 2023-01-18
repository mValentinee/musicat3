import type { FC } from "react";
import { trpc } from "../utils/trpc";
import { PlaylistRefactored } from "../constants/music.constants";
import { useState } from "react";

/**
 *TODO just get the api data, try through trpc , understand react query
 */

// RecentlyAdded Playlist statisfies PlaylistRefactored:
type RecentlyAddedProps = PlaylistRefactored;

const RecentlyAddedMarkUp = ({}) => {
  // const { key, number }<> = [
  //   {
  //     "key": 1,
  //   },
  //   {
  //     "key": 2,
  //   },
  // ];

  return (
    <div className=".absolute">
      {"key"}
      {"number"}
    </div>
  );
};

const RecentlyAddedPlaylist = () => {
  // use trpc router to get playlist
  const [playlist, setPlaylist] = useState<RecentlyAddedProps[]>([]);

  return <div>Recently Added</div>;
};

export default RecentlyAddedPlaylist;
