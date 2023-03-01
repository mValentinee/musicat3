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
        <div className="relative h-[180px] w-[300px] rotate-[17deg] scale-x-[-1] md:h-[500px] md:w-[700px] md:rotate-0 md:scale-x-[2] ">
          <Image src={spiralBg} alt="main-photo" fill />
        </div>
      </div>
    </div>
  );
};
