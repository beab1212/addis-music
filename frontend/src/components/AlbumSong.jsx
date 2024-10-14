import { useEffect, memo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivate } from "../api/axios";
import AudioHook from "../hooks/AudioHook";

const AlbumSong = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);
  // get refresh: change it's value in child component to trigger refresh
  const [refresh, setRefresh] = useState("false");
  useEffect(() => {
    axiosPrivate
      .get(`/album/${id}`)
      .then((res) => {
        setData(res.data?.album);
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
      <div className="sm:py-10 sm:bg-gradient-to-b from-[#e0cb419d] to-[#121212]">
        <h1 className="text-[38px] font-semibold mb-8 ml-8 uppercase text-nowrap">
          {data?.title}
        </h1>
      </div>
      <div className="flex flex-col relative z-[5] m-4 customScroll overflow-hidden overflow-y-scroll scroll-smooth">
        {data?.songs?.map((song, index) => (
          <SongTemplate
            song={song?.song_id}
            index={index}
            key={song?.song_id}
            albumId={id}
            setRefresh={setRefresh}
          />
        ))}
      </div>

      {/* TODO: make this div only visible if current user is creator of this play list */}
      <div
        className={`fixed bottom-[4.8rem] right-8 z-10 text-right py-4 cursor-pointer ${
          user?._id === data.user_id ? "block" : "hidden"
        }`}
      >
        <i
          className="fad fa-plus-circle text-right"
          style={{ fontSize: "3rem" }}
          onClick={() => {
            navigate(`/app/song/upload?album=${id}`)
          }}
        />
      </div>
    </section>
  );
};

const SongTemplate = (probs) => {
  const dispatch = useDispatch();
  const { formatTime, changePlay } = AudioHook();
  const user = useSelector((state) => state.user.user);
  const currentSong = useSelector((state) => state.currentSong);
  const [data, setData] = useState();
  let listNumber = probs.index;

  const handleDelete = (e, song_id) => {
    // Prevent click bubbling to parent div
    e.stopPropagation();
    axiosPrivate
      .delete(`/song/${song_id}`)
      .then((res) => {
        probs.setRefresh(Math.random());
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            message: res?.data?.message || null,
            type: "success",
            dismiss: 9000,
          },
        });
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
  }, []);
  return (
    <div
      className={`flex flex-row items-center py-4 px-2 rounded-lg cursor-pointer hover:bg-gray-800`}
      onClick={() => changePlay(data)}
    >
      <h4 className="text-[1.1rem] mr-4">{++listNumber}</h4>
      <img
        src={data?.song_art + "_100"}
        alt={data?._id}
        className="w-[40px] h-[40px] object-cover overflow-hidden min-w-[40px]"
      />

      <div className="flex flex-col ml-4 min-w-32">
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
          {data?.contributors.slice(0, 2).join(",")?.slice(0, 15)}
        </h6>
      </div>

      <p
        className={`text-dimWhite text-[13px] text-end w-full ${
          currentSong?._id === probs?.song && "text-red-700"
        }`}
      >
        {formatTime(data?.duration)}
      </p>
      { data?.user_id === user._id && (
        <div className="relative">
          <i
            className={`mx-4 fad fa-trash hover:text-red-600 px-1`}
            onClick={(e) => {
              handleDelete(e, probs.song);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default memo(AlbumSong);
