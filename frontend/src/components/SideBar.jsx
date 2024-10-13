import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { styles } from "../style";
import {
  discover,
  genre,
  topchart,
  podcast,
  favorites,
  playlist,
} from "../assets";

const SideBar = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Component SideBar");
  }, []);
  return (
    <section className={`md:px-16 px-4 ${styles.paddingY}`}>
      <div className="flex flex-col">
        {/* Finding's */}
        <div className="">
          <div className="flex flex-1 items-center mb-[25px] cursor-pointer">
            <img
              src={podcast}
              alt=""
              className="w-[28px] h-[28px] object-contain"
            />
            <h1
              className={`${styles.hoverColor} text-[13px] font-semibold px-8`}
              onClick={() => {
                navigate("/app/foryou");
              }}
            >
              FORYOU
            </h1>
          </div>

          <div className="flex flex-1 items-center mb-[25px] cursor-pointer">
            <img
              src={discover}
              alt="discover"
              className="w-[28px] h-[28px] object-contain"
            />
            <h1
              className={`${styles.hoverColor} text-[13px] font-semibold px-8`}
              onClick={() => {
                navigate("/app/discover");
              }}
            >
              DISCOVER
            </h1>
          </div>

          <div className="flex flex-1 items-center mb-[25px] cursor-pointer">
            <img
              src={genre}
              alt=""
              className="w-[28px] h-[28px] object-contain"
            />
            <h1
              className={`${styles.hoverColor} text-[13px] font-semibold px-8`}
              onClick={() => {
                navigate("/app/genre");
              }}
            >
              GENRE
            </h1>
          </div>

          <div className="flex flex-1 items-center mb-[25px] cursor-pointer">
            <img
              src={topchart}
              alt=""
              className="w-[28px] h-[28px] object-contain"
            />
            <h1
              className={`${styles.hoverColor} text-[13px] font-semibold px-8`}
            >
              TOP CHARTS
            </h1>
          </div>
        </div>

        {/* Yours */}
        <div className="mt-16">
          <div className="flex flex-1 items-center mb-[25px] cursor-pointer">
            <img
              src={favorites}
              alt=""
              className="w-[28px] h-[28px] object-contain"
            />
            <h1
              className={`${styles.hoverColor} text-[13px] font-semibold px-8`}
              onClick={() => {
                navigate("/app/favorite");
              }}
            >
              FAVORITES
            </h1>
          </div>
          <div className="flex flex-1 items-center mb-[25px] cursor-pointer">
            <img
              src={playlist}
              alt=""
              className="w-[28px] h-[28px] object-contain"
            />
            <h1
              className={`${styles.hoverColor} text-[13px] font-semibold px-8`}
              onClick={() => {
                navigate("/app/playlist");
              }}
            >
              PLAYLIST
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(SideBar);
