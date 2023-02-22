import { type NextPage } from "next";
import { HomeCover } from "../components/home";
import {
  RecentlyAddedPlaylist,
  RecommendedPlaylist,
} from "../components/recentlyAdded";
import { trpc } from "../utils/trpc";

//
/***
 * //TODO
 *main functionalilty  
 Search(udemy projects), Like, Save liked to new list, Route Home Icon,NavBar, MediaPlayer (nav should have similar values), Play / Pause / Skip
 */

const Home: NextPage = () => {
  return (
    <>
      <div className="mt-5 flex flex-col justify-between p-3 xl:flex-row">
        <HomeCover />
      </div>
      <div className=" p-3">
        <RecentlyAddedPlaylist />
        <RecommendedPlaylist />
      </div>
    </>
  );
};

export default Home;
