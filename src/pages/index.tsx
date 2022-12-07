import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { HomeCover } from "../components/home";
import TopCharts from "../components/likedCharts";
import { trpc } from "../utils/trpc";
import { record } from "././api/test";

/***
 * //TODO
 * 
 * stlying with figma? to grab css props then use those to make tailwind adjustments?
 * copy css into tailwind as read thru docs
 * 
 *main functionalilty  
 Search(udemy projects), Like, Save liked to new list, Route Home Icon,NavBar, MediaPlayer (nav should have similar values), Play / Pause / Skip
 *
 *secondary func
 User log in/out 
 */

const Home: NextPage = () => {
  // const { data, status } = useQuery({
  //   queryKey: ["musicData"],
  //   queryFn: fetchMusic,
  // });

  const { data, isLoading } = trpc.getMusic.getRecentlyAdded;

  //TODO receive components & hydrate them with data upon render

  // use zustard to hydrate the components

  return (
    <>
      <section className="pb-[120px]">
        <div className="mt-5 flex flex-col justify-between xl:flex-row">
          here
          {/* curated playlist */}
          {/* <HomeCover /> */}
          {/* {<TopCharts data={data} />} */}
        </div>
      </section>
    </>
  );
};

//TODO make api call here to receive music. serverside ?
// useQuery to get the fetch call ??
/**
 * Deezer Api
 * Spotify
 * Soundcloud
 */

export default Home;
