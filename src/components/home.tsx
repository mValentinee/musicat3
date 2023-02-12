import Image from "next/image";
import usersImage from "../../public/images/users-likes.png";
import spiralBg from "../../public/spiral-bg.png";
import { Heart } from "iconsax-react";

export const HomeCover = () => {
  return (
    // curated playlist
    <div className="relative mx-auto mb-10 flex h-[450px] w-[95%] justify-around overflow-hidden rounded-2xl bg-[#609EAF] md:rounded-[50px] xl:mx-0 xl:mb-0 xl:w-[55%]">
      {/* text */}
      <div className="mx-auto flex w-[80%] flex-col justify-evenly md:mx-0 md:w-[35%]">
        <p className="mb-36 md:mb-0">Curated Playlist </p>
        <div>
          <h1 className="mb-3 text-center  text-2xl font-bold">
            Music Collected From Soundcloud
          </h1>
          <p className="w-[85%] text-center text-sm md:w-full md:text-base">
            Some Of My Favorite Dance Bops
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Image src={usersImage} alt="users" />
          <Heart size="25" color="#FF0000" variant="Bold" />
          <span>33k Likes</span>
        </div>
      </div>

      {/* spiral image */}
      <div className="absolute right-[-120px] md:left-0">
        <div className="relative h-[180px] w-[300px] rotate-[17deg] scale-x-[-1] md:h-[500px] md:w-[700px] md:rotate-0 md:scale-x-[1] ">
          <Image
            src={spiralBg}
            alt="main-photo"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
      </div>

      {/* artist image */}
      {/* <div className="relative hidden h-full w-[320px] md:block">
        <Image
          src={Artist}
          alt="main-photo"
          layout="fill"
          objectFit="contain"
        />
      </div> */}
    </div>
  );
};
