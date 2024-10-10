import { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivate } from "../api/axios";
import AudioHook from "../hooks/AudioHook";

const TrackList = () => {
  const dispatch = useDispatch();
  const { changePlay } = AudioHook();
  const currentSong = useSelector((state) => state.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosPrivate
      .get("/song")
      .then((res) => {
        setData(res.data?.songs);
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
    console.log("Component TrackList");
  }, []);
  return (
    <section className="">
      <div className="sm:py-10 sm:bg-gradient-to-b from-[#41e0d89d] to-[#121212]">
        <h1 className="text-[38px] font-semibold mb-8 ml-8 uppercase">
          Discover
        </h1>
      </div>

      <div className="flex flex-wrap gap-5 justify-between relative z-[5] m-4 customScroll overflow-hidden overflow-y-scroll scroll-smooth">
        {data?.map((song) => (
          <div key={song._id} className={`flex relative rounded-lg cursor-pointer overflow-hidden hover:bg-gray-800 md:w-[10rem] w-[6rem] ${currentSong?._id === song._id && 'animate-pulse'}`} onClick={() => changePlay(song)}
          >
            <img
              src={song.song_art + '_200'}
              alt={song?._id}
              className="w-full object-cover"
            />

            <div className="absolute bottom-0 flex w-full flex-col bg-gradient-to-b from-[#2828281a] to-[#000000] pl-2">
              <h5 className="text-[14px] font-semibold cursor-pointer hover:text-dimWhite text-nowrap">
                {song.title}
              </h5>
              <h2 className="text-[13px] text-dimWhite cursor-pointer hover:text-white text-nowrap">
                {song.contributors.slice(0, 2).join(',').slice(0, 15)}
              </h2>
            </div>

            <div className="absolute hover:flex flex top-0 items-center justify-center w-full h-full">
              <div className={`flex items-center justify-center rounded-full w-10 h-10 bg-[#1194c8] shadow-lg shadow-gray-900 pl-[0.3rem] overflow-hidden ${(currentSong?._id === song._id ) && 'slow-spin'} ${!isPlaying && 'paused'}`}>
                <i className="fa fa-play" style={{ fontSize: "1.4rem" }} />
              </div>
            </div>
          </div>
        ))}
        {/* <div className="absolute z-[-1] right-[-10rem] top-0 w-[40%] h-[70%] rounded-full blue_gradient" /> */}
      </div>
    </section>
  );
};

export default memo(TrackList);
