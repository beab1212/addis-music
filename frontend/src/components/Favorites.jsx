import { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivate } from "../api/axios";
import AudioHook from "../hooks/AudioHook";
import { styles } from "../style";

const Favorites = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  // get refresh: change it's value in child component to trigger refresh
  const [refresh, setRefresh] = useState("false");
  useEffect(() => {
    axiosPrivate
      .get(`/song/favorite`)
      .then((res) => {
        setData(res.data?.favSongs);
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
  }, [refresh]);
  return (
    <section className="grid sm:grid-rows-[150px_1fr]">
      <div className="sm:py-10 sm:bg-gradient-to-b from-[#6941e09d] to-[#121212]">
        <h1 className="text-[38px] font-semibold mb-8 ml-8 uppercase text-nowrap">
          Favorites
        </h1>
      </div>
      <div className="flex flex-col relative z-[5] m-4 customScroll overflow-hidden overflow-y-scroll scroll-smooth">
        {data?.map((favSong, index) => (
          <SongTemplate
            song={favSong?.song_id}
            setRefresh={setRefresh}
            index={index}
            key={favSong?.song_id}
          />
        ))}
      </div>
    </section>
  );
};

const SongTemplate = (probs) => {
  const dispatch = useDispatch();
  const { formatTime, changePlay } = AudioHook();
  const currentSong = useSelector((state) => state.currentSong);
  let listNumber = probs.index;
  const [data, setData] = useState();
  const [localLike, setLocalLike] = useState(true);
  const toggleLike = () => {
    axiosPrivate
      .post(`/song/${probs.song}/like`)
      .then((res) => {
        setLocalLike(res.data?.like);
        // set to random(selectedSong.id) value to trigger refresh in parent component
        probs.setRefresh(res.data?.like);
      })
      .catch((err) => {
        // nothing to do
      });
  };
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
            message: err?.response?.data?.error || null,
            type: "warning",
            dismiss: 9000,
          },
        });
      });
  }, [localLike]);
  return (
    <div
      className={`flex flex-row items-center py-4 px-2 rounded-lg cursor-pointer hover:bg-gray-800`}
      onClick={() => changePlay(data)}
    >
      <h4 className="text-[1.1rem] mr-4">{++listNumber}</h4>
      <i
        className={`ml-1 ${styles.hoverColor} fad fa-star mr-2 ${
          localLike
            ? "text-[#0053b9] hover:text-[#4a9124] "
            : "hover:text-[#6093d2]"
        }`}
        style={{ fontSize: "1rem" }}
        onClick={toggleLike}
      />
      <img
        src={data?.song_art + "_100"}
        alt={data?._id}
        className="w-[40px] h-[40px] object-cover overflow-hidden min-w-[40px]"
      />

      <div className="flex flex-col ml-4">
        <h5
          className={`text-[13px] font-semibold cursor-pointer hover:text-dimWhite text-nowrap ${
            currentSong?._id === probs?.song && "text-red-500"
          }`}
        >
          {data?.title}
        </h5>
        <h6
          className={`text-[13px] text-dimWhite cursor-pointer hover:text-white text-nowrap `}
        >
          {data?.contributors.slice(0, 2).join(",")}
        </h6>
      </div>

      <p className="text-dimWhite text-[13px] text-end w-full">
        {formatTime(data?.duration)}
      </p>
    </div>
  );
};

export default memo(Favorites);
