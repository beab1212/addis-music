import { useEffect, memo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../api/axios";
import AudioHook from "../hooks/AudioHook";

const SongTemplate = (probs) => {
  const dispatch = useDispatch();
  const { formatTime, changePlay } = AudioHook();
  const [data, setData] = useState();
  let listNumber = probs.index;
  useEffect(() => {
    axiosPrivate
      .get(`/song/${probs.song}`)
      .then((res) => {
        setData(res.data.song);
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            message: err.response.data?.error,
            type: "warninng",
            dismiss: 9000,
          },
        });
      });
  }, []);
  return (
    <div className="flex flex-row items-center py-4 px-2 rounded-lg cursor-pointer hover:bg-gray-800" onClick={() => changePlay(data)}>
      <h4 className="text-[1.1rem] mr-4">{++listNumber}</h4>
      <img
        src={data?.song_art}
        alt={data?._id}
        className="w-[40px] h-[40px] object-cover overflow-hidden"
      />

      <div className="flex flex-col ml-4">
        <h5 className="text-[13px] font-semibold cursor-pointer hover:text-dimWhite">
          {data?.title}
        </h5>
        <h5 className="text-[13px] text-dimWhite cursor-pointer hover:text-white">
          {data?.contributors.slice(0, 2).join(',')}
        </h5>
      </div>

      <p className="text-dimWhite text-[13px] text-end w-full">
        {formatTime(data?.duration)}
      </p>
    </div>
  );
};

const PlaylistSong = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosPrivate
      .get(`/playlist/${id}`)
      .then((res) => {
        setData(res.data?.playlist);
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            message: err.response.data?.error,
            type: "warninng",
            dismiss: 9000,
          },
        });
      });
  }, []);
  return (
    <section className="grid sm:grid-rows-[150px_1fr]">
      <div className="sm:py-10 sm:bg-gradient-to-b from-[#e0cb419d] to-[#121212]">
        <h1 className="text-[38px] font-semibold mb-8 ml-8 uppercase">
          {data?.name}
        </h1>
      </div>
      <div className="flex flex-col relative z-[5] m-4 customScroll overflow-hidden overflow-y-scroll scroll-smooth">
        {data?.songs?.map((song, index) => (
          <SongTemplate song={song?.song_id} index={index} key={song?.song_id} />
        ))}

        {/* <div className="absolute z-[-1] right-[-10rem] top-0 w-[40%] h-[70%] rounded-full blue_gradient" /> */}
      </div>
    </section>
  );
};

export default memo(PlaylistSong);
