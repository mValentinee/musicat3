import { type NextPage } from "next";
import { HomeCover } from "../components/home";
import RecentlyAddedPlaylist from "../components/recentlyAdded";
import { trpc } from "../utils/trpc";

//
/***
 * //TODO
 *main functionalilty  
 Search(udemy projects), Like, Save liked to new list, Route Home Icon,NavBar, MediaPlayer (nav should have similar values), Play / Pause / Skip
 */

const Home: NextPage = () => {
  // const { data, isLoading } = trpc.playlist.getPlaylist.useQuery(1);

  // const tracks = data?.tracks;
  return (
    <>
      <section className="pb-[100px]">
        <div className="mt-5 flex flex-col justify-between xl:flex-row">
          {/* curated playlist */}
          <HomeCover />
          {/* {<LikedChart data={data} />} */}
        </div>
      </section>
      <div>
        <RecentlyAddedPlaylist />
      </div>
    </>
  );
};

export default Home;
