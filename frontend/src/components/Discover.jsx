import { useEffect, memo, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivate } from "../api/axios";
import AudioHook from "../hooks/AudioHook";

const Discover = () => {
  const location = useLocation();
  const { outerDivRef } = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { changePlay } = AudioHook();
  const currentSong = useSelector((state) => state.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  let page = 1;
  const [data, setData] = useState([]);

  const handleScroll = () => {
    const scrollableHeight =
      outerDivRef.current.scrollHeight - outerDivRef.current.clientHeight;
    const currentScrollPos = outerDivRef.current.scrollTop;

    if (currentScrollPos >= scrollableHeight) {
      fetchNewPage();
      // Remove the event listener after detecting scroll once
      outerDivRef.current.removeEventListener("scroll", handleScroll);
    }
  };

  const fetchNewPage = () => {
    page = page + 1;
    
    axiosPrivate
      .get(`/discover${location.search}${location.search ? '&' : '?'}page=${page}`)
      .then((res) => {
        if (res.status === 200) {
          setData((prev) => {
            return {
              songs: prev.songs.concat(res.data?.discover?.songs),
              playlists: prev.playlists.concat(res.data?.discover?.playlists),
            };
          });
          // Reattach event listener
          outerDivRef.current.addEventListener("scroll", handleScroll);
        }
        // No Content
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            message: err?.response?.data?.error || null,
            type: "warning",
            dismiss: 9000,
          },
        });
        // Reattach event listener
        outerDivRef.current.addEventListener("scroll", handleScroll);
      });
  };

  useEffect(() => {
    axiosPrivate
      .get(`/discover${location.search}`)
      .then((res) => {
        setData(res.data?.discover);
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            message: err?.response?.data?.error || null,
            type: "warning",
            dismiss: 9000,
          },
        });
      });

    if (outerDivRef.current) {
      outerDivRef.current.addEventListener("scroll", handleScroll);
    }

    console.log("Component Discover");

    return () => {
      if (outerDivRef.current) {
        outerDivRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [location]);
  return (
    <section className="">
      <div className="sm:py-10 sm:bg-gradient-to-b from-[#41e0d89d] to-[#121212]">
        <h1 className="text-[38px] font-semibold mb-8 ml-8 max-xs:text-[30px] max-xs:mb-2 uppercase">
          Discover
        </h1>
      </div>

      <div
        className={`${
          data?.playlists && data?.playlists.length === 0 && "hidden"
        }`}
      >
        <h2 className="text-[24px] font-semibold mb-8 ml-8 uppercase">
          Playlists
        </h2>
        <div className="flex flex- gap-5 justify-between relative z-[5] m-4 overflow-y-hidden customScroll overflow-x-scroll scroll-smooth">
          {data?.playlists &&
            data.playlists?.map((playlist) => (
              <div
                key={playlist._id}
                className={`flex relative min-w-[10rem] rounded-lg cursor-pointer overflow-hidden hover:bg-gray-800 md:w-[10rem]`}
                onClick={() => navigate(`/app/playlist/${playlist?._id}`)}
              >
                <img
                  src={playlist.playlist_art + "_200"}
                  alt={playlist?._id}
                  className="w-full object-cover"
                />

                <div className="absolute bottom-0 pb-2 flex w-full flex-col bg-gradient-to-b from-[#2828281a] to-[#000000] pl-2">
                  <p className="text-[16px] pb-2 font-semibold cursor-pointer hover:text-dimWhite text-nowrap">
                    {playlist.name}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h2 className="text-[24px] font-semibold mb-8 ml-8 uppercase">Songs</h2>
        <div className="flex flex-wrap gap-5 justify-between relative z-[5] m-4 customScroll overflow-hidden overflow-y-scroll scroll-smooth">
          {data?.songs &&
            data.songs?.map((song) => (
              <div
                key={song._id}
                className={`flex relative rounded-lg cursor-pointer overflow-hidden hover:bg-gray-800 max-sm:w-[30%] max-xs:w-[45%] sm:w-[8rem] md:w-[10rem] ${
                  currentSong?._id === song._id && "animate-pulse"
                }`}
                onClick={() => changePlay(song)}
              >
                <img
                  src={song.song_art + "_200"}
                  alt={song?._id}
                  className="w-full object-cover"
                />

                <div className="absolute bottom-0 flex w-full flex-col bg-gradient-to-b from-[#2828281a] to-[#000000] pl-2">
                  <h5 className="text-[14px] font-semibold cursor-pointer hover:text-dimWhite text-nowrap">
                    {song.title}
                  </h5>
                  <h6 className="text-[13px] text-dimWhite cursor-pointer hover:text-white text-nowrap">
                    {song.contributors.slice(0, 2).join(",").slice(0, 15)}
                  </h6>
                </div>

                <div className="absolute hover:flex flex top-0 items-center justify-center w-full h-full">
                  <div
                    className={`flex items-center justify-center rounded-full sm:w-10 sm:h-10 w-8 h-8 bg-[#1194c8] shadow-lg shadow-gray-900 pl-[0.3rem] overflow-hidden ${
                      currentSong?._id === song._id && "slow-spin"
                    } ${!isPlaying && "paused"}`}
                  >
                    <i className="fa fa-play" style={{ fontSize: "1.4rem" }} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default memo(Discover);
