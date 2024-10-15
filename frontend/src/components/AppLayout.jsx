import React, { useEffect, memo, Suspense, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import MusicPlayer from "./MusicPlayer";
import SmallBar from "./SmallBar";

const AppLayout = () => {
  const location = useLocation();
  const outerDivRef = useRef(null);
  const fullLayoutPaths = ["/app/profile", "/app/manage", "/app/manage/song", "/app/manage/playlist", "/app/manage/album", "/app/player"];
  const isFullLayout = fullLayoutPaths.includes(location.pathname);

  useEffect(() => {
  }, []);
  return (
    <div
      className={`grid grid-cols-[1fr_1fr_1fr_1fr] sm:grid-rows-[56px_1fr_60px] grid-rows-[56px__50px_1fr_60px] gap-4 h-screen mx-auto sm:px-2 px-1`}
    >

      <div className="col-span-full flex items-center overflow-hiddenx bg-[#121212] rounded-lg">
        <Header />
      </div>

      {!isFullLayout && (
        <div className="col-span-full hidden max-sm:flex items-center overflow-hidden px-1 bg-[#121212] rounded-lg">
          <SmallBar />
        </div>
      )}

      {!isFullLayout && (
        <div className="bg-[#121212] rounded-lg overflow-y-scroll scroll-smooth customScroll sm:block hidden">
          <SideBar />
        </div>
      )}

      {/* Central section AKA Route */}
      <div
        ref={outerDivRef}
        className={`${
          !isFullLayout
            ? "sm:col-start-2 col-start-1 col-end-5"
            : "col-start-1 col-end-5 row-start-2 row-end-5 mb-2"
        } bg-[#121212] rounded-lg overflow-y-scroll overflow-x-hidden scroll-smooth customScroll`}
      >
        <section className={`borderx border-green-500`}>
          <Suspense
            fallback={
              <div>
                <h1 className="text-[20px] text-red-500">Loading...</h1>
              </div>
            }
          >
            <Outlet context={{ outerDivRef }} />
          </Suspense>
        </section>
      </div>

      {!isFullLayout && (
        <div className="col-span-full bg-[#121212] rounded-lg pb-2 pt-1">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default memo(AppLayout);
