import { type NextPage } from "next";
import { HomeCover } from "../components/home";
import {
  RecentlyAddedPlaylist,
  RecommendedPlaylist,
} from "../components/recentlyAdded";
import { AudioPlayer } from "../components/audioPlayer";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  return (
    <div className="before:opacity-15 flex-col justify-between bg-gradient-to-r from-t3-purple-50 to-t3-purple-1000 before:absolute before:inset-0 before:block before:h-full before:w-full before:bg-[url('/images/background-pattern.svg')] before:bg-cover before:bg-no-repeat xl:flex-row">
      <HomeCover />
      <AudioPlayer />
      {/* <div className="flex flex-col justify-between p-3 xl:flex-row">  <HomeCover /> </div> */}
      <div className=" p-3">
        <RecentlyAddedPlaylist />
        <RecommendedPlaylist />
      </div>
      music
    </div>
  );
};

export default Home;
