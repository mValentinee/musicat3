import { type NextPage } from "next";
import {
  RecentlyAddedPlaylist,
  RecommendedPlaylist,
} from "../components/musicColumns";
import Image from "next/image";
import usersImage from "../../public/images/users-likes.png";
import spiralBg from "../../public/spiral-bg.png";
import { Heart } from "iconsax-react";
import Artist from "../../public/images/CoverArtist.png";
import { useState } from "react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  // mutation to add playlist to database
  const mutate = trpc.playlist.FetchAndCreatePlaylist.useMutation();
  mutate.mutate();

  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full overflow-hidden pb-20 ">
      <section className="mb-10 flex flex-col lg:flex-row">
        <div className="relative flex h-[70vh] max-h-[503px] overflow-hidden rounded-[40px] bg-[#609EAF] text-white  shadow-[0_15px_22px_-20px_rgba(122,144,150,1)] md:h-[373px] lg:mr-6 lg:w-2/3">
          <Image
            src={spiralBg}
            alt="main-photo"
            className="absolute -right-36 -top-20 rotate-90 md:right-0 md:top-0 md:rotate-0"
          />
          <div className="z-10 flex h-full flex-col py-[38px] px-8 lg:justify-between lg:px-[45px]">
            <span className="mb-auto lg:mb-0">Curated playlist</span>

            <article className="mb-11">
              <h2 className="text-4xl font-bold leading-[120%]">
                Favorite Bops
              </h2>
              <p className="w-full max-w-[17.25rem] text-sm leading-[120%]">
                All mine, Lie again, Petty call me everyday, Out of time, No
                love, Bad habit, and so much more
              </p>
            </article>

            <div className="flex items-center gap-3">
              <Image src={usersImage} alt="users" />
              <button onClick={() => setLiked(true)}>
                <Heart
                  size="20"
                  color={liked ? "#FF0000" : "#ffffff"}
                  variant="Bold"
                  className="ml-3 mr-2 h-5 w-5 lg:h-4 lg:w-4"
                />
                <span>22k Likes</span>
              </button>
            </div>
          </div>
          <Image
            src={Artist}
            alt="main-photo"
            className="z-10 ml-auto hidden md:block"
          />
        </div>
        <div className="mt-[47px] w-full lg:mt-0 lg:w-1/3">
          <h2 className="mb-3.5 text-2xl font-bold text-white">Top Charts</h2>
          <div className="flex flex-row flex-nowrap overflow-x-scroll lg:flex-col">
            {"topCharts"}
          </div>
        </div>
      </section>
      <div>
        <h3 className="mb-3 text-2xl font-bold text-white">Recently Added.</h3>

        <RecentlyAddedPlaylist />
      </div>
      <div>
        <h3 className="mb-3 text-2xl font-bold text-white">
          Popular in your area
        </h3>

        <RecommendedPlaylist />
      </div>
    </div>
  );
};

export default Home;
