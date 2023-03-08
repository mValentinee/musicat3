import { type ReactElement } from "react";
import Navbar from "./navBar";
import { Player } from "./audioPlayer";

export const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <section className="before:opacity-15 grid grid-cols-12 bg-gradient-to-r from-t3-purple-50 to-t3-purple-1000 before:absolute before:inset-0 before:block before:h-full before:w-full before:bg-[url('/images/background-pattern.svg')] before:bg-cover before:bg-no-repeat">
      {/* navbar */}
      <Navbar />

      {/* content */}
      <div className="relative col-span-12 mx-auto w-[95%] md:col-span-11 md:w-full md:pr-8">
        {/* search bar */}
        {"search"}
        {/* <Search />
        {search !== "" && focusOn && <SearchResult />} */}

        {/* main content */}
        {children}
      </div>

      {/* song player */}
      <Player />
      {/* <SongPlayer /> */}
    </section>
  );
};
