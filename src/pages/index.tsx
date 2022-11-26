import { useQuery } from "@tanstack/react-query";
import { type NextPage } from "next";
import { HomeCover } from "../components/home";
import TopCharts from "../components/likedCharts";
import { trpc } from "../utils/trpc";

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

//TODO take data save to DB

const fetchMusic = async () => {
  "music";
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "55b9fe8337mshc0ef62c754536fdp12ececjsn0db06744573e",
  //       "X-RapidAPI-Host": "soundcloud-scraper.p.rapidapi.com",
  //     },
  //   };
  //   const recentlyAddedId =
  //     "https://soundcloud-scraper.p.rapidapi.com/v1/playlist/tracks?playlist=https%3A%2F%2Fsoundcloud.com%2Fv-val-1%2Fsets%2Fmusicarecentlyadded";
  //   const get = await fetch(`${recentlyAddedId}`, options);
  //   const res = await get.json();
  //   return console.log(res);
};

const Home: NextPage = () => {
  const { data, status } = useQuery({
    queryKey: ["musicData"],
    queryFn: fetchMusic,
  });

  //TODO receive components & hydrate them with data upon render

  // use zustard to hydrate the components

  return (
    <>
      <section className="pb-[120px]">
        <div className="mt-5 flex flex-col justify-between xl:flex-row">
          {/* curated playlist */}
          <HomeCover />
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
