import React, { useEffect, memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import MusicPlayer from "./MusicPlayer";

const AppLayout = () => {
  useEffect(() => {
    console.log('Component AppLayout');
  }, [])
  return (
    <div
    className={`grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[56px_1fr_60px] gap-4 h-screen mx-auto sm:px-2 px-1`}
  >
    <div className="col-span-full flex items-center overflow-hidden bg-[#121212] rounded-lg">
      <Header />
    </div>

    {/* TODO: make this 2 row  */}
    {/* <div className="col-span-full bg-[#121212] overflow-hidden rounded-lg pt-2l"> */}
    {/* <MusicPlayer /> */}
    {/* <MaxPlayer /> */}
    {/* </div> */}

    <div className="bg-[#121212] rounded-lg overflow-y-scroll scroll-smooth customScroll sm:block hidden">
      <SideBar />
    </div>

    {/* Central section AKA Route */}
    <div className="sm:col-start-2 col-start-1 col-end-5 bg-[#121212] rounded-lg overflow-y-scroll overflow-x-hidden scroll-smooth customScroll">
      <section className={`borderx border-green-500`}>
        {/* <Genre /> */}
        {/* <TrackList /> */}
        {/* <Playlist /> */}
        <Outlet />
      </section>
    </div>

    <div className="col-span-full bg-[#121212] rounded-lg pt-2">
      <MusicPlayer />
    </div>
  </div>
  );
};

export default memo(AppLayout);
