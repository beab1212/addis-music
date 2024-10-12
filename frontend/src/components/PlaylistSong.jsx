import { useEffect, memo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivate } from "../api/axios";
import AudioHook from "../hooks/AudioHook";
import { playlist } from "../assets";

const PlaylistSong = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [addToggle, setAddToggle] = useState(false);
  const user = useSelector((state) => state.user.user);
  const [data, setData] = useState([]);
  // get refresh: change it's value in child component to trigger refresh
  const [refresh ,setRefresh] = useState("false");
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
            message: err?.response?.data?.error || null,
            type: "warning",
            dismiss: 9000,
          },
        });
      });
  }, [refresh]);
  return (
    <section className="grid sm:grid-rows-[150px_1fr]">
      <AddPlaylistSong toggle={addToggle} playlist_id={id} setAddToggle={setAddToggle} setRefresh={setRefresh} />
      <div className="sm:py-10 sm:bg-gradient-to-b from-[#e0cb419d] to-[#121212]">
        <h1 className="text-[38px] font-semibold mb-8 ml-8 uppercase text-nowrap">
          {data?.name}
        </h1>
      </div>
      <div className="flex flex-col relative z-[5] m-4 customScroll overflow-hidden overflow-y-scroll scroll-smooth">
        {data?.songs?.map((song, index) => (
          <SongTemplate
            song={song?.song_id}
            index={index}
            key={song?.song_id}
            isOwner={(user._id === data.user_id)}
          />
        ))}
      </div>

      {/* TODO: make this div only visible if current user is creator of this play list */}
      <div
        className={`fixed bottom-[4.8rem] right-8 z-10 text-right py-4 cursor-pointer ${
          user._id === data.user_id ? "block" : "hidden"
        }`}
      >
        <i
          className="fad fa-plus-circle text-right"
          style={{ fontSize: "3rem" }}
          onClick={() => {
            setAddToggle((prev) => !prev);
          }}
        />
      </div>
    </section>
  );
};

const SongTemplate = (probs) => {
  const dispatch = useDispatch();
  const { formatTime, changePlay } = AudioHook();
  const currentSong = useSelector((state) => state.currentSong);
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
        src={data?.song_art + '_100'}
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

      <p className={`text-dimWhite text-[13px] text-end w-full ${currentSong?._id === probs?.song && "text-red-700"}`}>
        {formatTime(data?.duration) }
      </p>
      { probs.isOwner && (
        <i className={`mx-4 fad fa-ellipsis-v-alt hover:text-pink-800`} />
      )}
    </div>
  );
};


// Popup component
const AddPlaylistSong = (probs) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [availableSong, setAvailableSong] = useState([]);
  // selected song
  const [selectedSong, setSelectedSong] = useState({
    title: null,
    id: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosPrivate
      .post(`/playlist/${probs.playlist_id}/song/${selectedSong.id}`, query, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            message: res.data?.message,
            type: "success",
            dismiss: 9000,
          },
        });
        // set to random(selectedSong.id) value to trigger refresh in parent component
        probs.setRefresh(selectedSong.id)

        setTimeout(() => {
          probs.setAddToggle(false);
        }, 500);
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
    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 3) {
        axiosPrivate
          .get(`/song?per_page=8&query=${query}`)
          .then((res) => {
            setAvailableSong(res.data?.songs);
          })
          .catch((err) => {
            setAvailableSong(null);
          });
      } else {
        setAvailableSong(null);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn); // Cleanup timeout on component unmount or query change
  }, [query]);

  return (
    <div
      className={`fixed ${
        probs.toggle ? "block" : "hidden"
      } z-20 bg-opacity-95 bottom-[4.8rem] sm:right-4 sm:w-1/3 w-[98%] rounded-lg bg-gray-900`}
    >
      <div className="p-4">
        <form action="" onSubmit={handleSubmit}>
          <div className="">
            <label
              htmlFor="name"
              className="mb-2.5 block text-base font-medium text-dark text-white"
            >
              Search Song
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name of the song to be added"
              className="w-full rounded-lg border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary text-gray-900"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
          </div>
          {/* Selected song */}
          <h4 className="font-semibold mt-2 text-dimWhite">
            { selectedSong?.title ? selectedSong?.title : 'No song selected' }
          </h4>
          <div className="">
            <label
              htmlFor="playlist_art"
              className="mb-2.5 block text-base font-medium text-dark text-white pt-4"
            >
              Available songs
            </label>
            <ul className="pl-4 overflow-y-scroll customScroll">
              {availableSong ? (
                availableSong.map((song) => (
                  <li
                    key={song._id}
                    className="text-dimWhite cursor-pointer hover:text-white text-nowrap"
                    onClick={() => {
                      setSelectedSong({ title: song?.title, id: song?._id });
                    }}
                  >
                    {song.title}
                  </li>
                ))
              ) : (
                <li>No Match Found!</li>
              )}
            </ul>
          </div>
          <div className="text-right py-4 cursor-pointer">
            <button type="submit">
              <i
                className="fad fa-plus-circle text-right"
                style={{ fontSize: "3rem" }}
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default memo(PlaylistSong);
