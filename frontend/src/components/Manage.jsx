import { Suspense } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Manage = () => {
  return (
    <section className="col-span-full bg-[#121212] pt-2l overflow-hidden border-2x">
      {/* h-full overflow-x-hidden rounded-lg pt-2l overflow-y-scroll customScroll */}
      <div className="absolute  px-2 top-[4.5rem] right-[0px] rounded-lg w-full">
        <div className="bg-[#121212] rounded-lg">
          <div className="max-w-[350px] px-6 bg-[#212121] mx-auto p-2 flex justify-between rounded-b-lg font-semibold">
            <Link to="/app/manage/song">Song</Link>
            <Link>Album</Link>
            <Link>Playlist</Link>
          </div>
        </div>
      </div>

      <div className="px-2 py-16">
        {/* Outlet */}
        <Suspense
          fallback={
            <div>
              <h1 className="text-[20px] text-red-500">Loading...</h1>
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </div>
    </section>
  );
};

export default Manage;
