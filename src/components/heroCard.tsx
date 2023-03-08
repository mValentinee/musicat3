import Image from "next/image";
import usersImage from "../../public/images/users-likes.png";
import spiralBg from "../../public/spiral-bg.png";
import { Heart } from "iconsax-react";
import Artist from "../../public/images/CoverArtist.png";
import { useState } from "react";

export const HomeCover = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative mx-auto mb-10 flex h-[450px] w-[95%] justify-around overflow-hidden rounded-2xl bg-[#27697b] text-slate-500 md:rounded-[50px] xl:mx-0 xl:mb-0 xl:w-[55%]">
      {/* text */}
      <div className="flex w-[80%] flex-col justify-evenly md:mx-0 md:w-[35%]">
        <p className="mb-10 pr-8 text-center text-sm">
          Curated Playlist Not For Commerical Use
        </p>
        <div>
          <h1 className="mb-10 text-center text-2xl font-bold text-slate-900">
            Music Collected From Soundcloud API
          </h1>
          <p className="text-center text-sm md:w-full md:text-base">
            Some Of My Favorite Dance Bops
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Image src={usersImage} alt="users" />
          <button onClick={() => setLiked(true)}>
            <Heart
              size="20"
              color={liked ? "#FF0000" : "#ffffff"}
              variant="Bold"
            />
            <span>22k Likes</span>
          </button>
        </div>
      </div>
      {/* artist image */}
      <div className="relative hidden h-[460px] w-[220px] sm:block md:block">
        <Image src={Artist} alt="main-photo" fill />
      </div>
      {/* spiral image */}
      <div className="absolute right-[-140px] md:left-5">
        <div className=" h-[180px] w-[300px] rotate-[17deg] scale-x-[1] md:h-[500px] md:w-[900px] md:rotate-0 md:scale-x-[2] ">
          <Image src={spiralBg} alt="main-photo" fill />
        </div>
      </div>
    </div>
  );
};

const HeroCover = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="w-full overflow-hidden pb-20">
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
        <h3 className="mb-3 text-2xl font-bold text-white">New releases.</h3>
        {/* <ListContainer>{newRelease}</ListContainer> */}
      </div>
      <div>
        <h3 className="mb-3 text-2xl font-bold text-white">
          Popular in your area
        </h3>
        {/* <ListContainer>{popular}</ListContainer> */}
      </div>
    </div>
  );
};
