import { type NextPage } from "next";
import { HomeCover } from "../components/home";
import RecentlyAddedPlaylist from "../components/recentlyAdded";
import { trpc } from "../utils/trpc";
import {
  type PlaylistRefactored,
  type PlaylistResponse,
} from "../constants/music.constants";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetch_PLAYLIST } from "../utils/fetch";
//
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

//BUGS backend & frontend is not in sync .

// confused how can the data be undefined when it is being fetched from the backend. & the cilent side is receiving the data

// no matter what procedure both are reading undefined from the backend
// what if the cilent isnt actually receving but showing the data saved in the DB like a screenshot

const Home: NextPage = () => {
  // const playlist = trpc.GETmusic.GETmusicProcedure.useQuery();
  // const mutate = trpc.CRUDmusic.crudMusic.useMutation();
  // if (playlist.isSuccess) {
  //   mutate.mutate({
  //     recentlyAdded: playlist.data[0],
  //     recommended: playlist.data[1],
  //   });
  // }
  // playlist.mutate();

  const [recentlyAdded, setRecentlyAdded] = useState<object>({});
  const { data } = trpc.GETmusic.getPlaylist.useQuery(1);
  console.log(data, typeof data);
  // setRecentlyAdded(data);

  // deconstruct data to expose every field inside the array

  return (
    <>
      <section className="pb-[120px]">
        <div className="mt-5 flex flex-col justify-between xl:flex-row">
          {/* curated playlist */}
          {/* <HomeCover /> */}
          {/* {<LikedChart data={data} />} */}
          <RecentlyAddedPlaylist />
        </div>
      </section>
    </>
  );
};

export default Home;
