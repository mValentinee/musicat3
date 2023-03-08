import Link from "next/link";
import { useRouter } from "next/router";
import MusicaLogoSvg from "../../public/icons/MusicaLogoSvg";
import { MdHomeFilled } from "react-icons/md";
import {
  MusicLibrary2,
  Radio,
  VideoHorizontal,
  Profile,
  LogoutCurve,
} from "iconsax-react";

const DesktopNav = () => {
  // router
  const router = useRouter();

  return (
    <div className="sticky top-0 hidden h-screen flex-col items-center gap-[45px] pt-5 md:col-span-1 md:flex">
      {/* home icon */}
      <Link
        href="/"
        className="transition duration-300 ease-in-out hover:scale-125"
      >
        <MusicaLogoSvg />
      </Link>

      {/* first part of nav */}
      <nav className="flex flex-col items-center justify-center gap-7 rounded-full bg-[#1A1E1F] py-6 px-3">
        {/* home */}
        <Link href="/">
          <MdHomeFilled className="h-[32px] w-[32px] transition duration-300 ease-in-out hover:scale-125" />
        </Link>

        {/* collections */}
        <Link href="/underConstruction">
          <MusicLibrary2
            size="32"
            variant="Bold"
            className="h-[32px] w-[32px] transition duration-300 ease-in-out hover:scale-125"
          />
        </Link>

        {/* radio */}
        <Link href="/underConstruction">
          <Radio
            size="32"
            variant="Bold"
            className="h-[32px] w-[32px] transition duration-300 ease-in-out hover:scale-125"
          />
        </Link>

        {/* video */}
        <Link href="/underConstruction">
          <VideoHorizontal
            size="32"
            variant="Bold"
            className="h-[32px] w-[32px] transition duration-300 ease-in-out hover:scale-125"
          />
        </Link>
      </nav>

      {/* second part of nav */}
      <nav className="flex flex-col gap-7 rounded-full bg-[#1A1E1F] py-6 px-3">
        {/* profile */}
        <Link href="/underConstruction">
          <Profile
            size="32"
            variant="Bold"
            className="h-[32px] w-[32px] transition duration-300 ease-in-out hover:scale-125"
          />
        </Link>

        {/* logout */}
        <Link href="/underConstruction">
          <LogoutCurve
            size="32"
            variant="Bold"
            className="h-[32px] w-[32px] transition duration-300 ease-in-out hover:scale-125"
          />
        </Link>
      </nav>
    </div>
  );
};

const Navbar = () => {
  return (
    <>
      {/* <MobileNav /> */}
      <DesktopNav />
    </>
  );
};

export default Navbar;
