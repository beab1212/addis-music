import { useEffect, memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddPlaylist from "./AddPlaylist";
import { axiosPrivate } from "../api/axios";

const Playlist = () => {
  const navigate = useNavigate();
  const [addToggle, setAddToggle] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosPrivate
      .get("/playlist")
      .then((res) => {
        setData(res.data?.playlists);
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
    console.log("Component Playlist");
  }, []);
  return (
    <section className="grid sm:grid-rows-[150px_1fr]">
      <AddPlaylist toggle={addToggle} />
      <div className="sm:py-10 sm:bg-gradient-to-b from-[#e0cb419d] to-[#121212]">
        <h1 className="text-[38px] font-semibold mb-8 ml-8 uppercase">
          Playlist
        </h1>
      </div>
      <div className="flex flex-wrap gap-5 justify-between relative z-[5] m-4 customScroll overflow-hidden overflow-y-scroll scroll-smooth" onClick={() => {
        setAddToggle(false)
      }}>
        {data?.map((playlist) => (
          <div
            key={playlist._id}
            className={`flex relative rounded-lg cursor-pointer overflow-hidden hover:bg-gray-800 md:w-[10rem] w-full max-h-40`}
            onClick={() => navigate(`/app/playlist/${playlist?._id}`)}
          >
            <img
              src={playlist.playlist_art}
              alt={playlist._id}
              className="w-full object-cover"
            />

            <div className="absolute bottom-0 flex w-full flex-col bg-gradient-to-b from-[#2828281a] to-[#000000] pl-2">
              <h5 className="md:text-[14px] text-[24px] font-semibold cursor-pointer hover:text-dimWhite">
                {playlist.name}
              </h5>
              <h5 className="text-[13px] text-dimWhite cursor-pointer hover:text-white">
                {playlist.name}
              </h5>
            </div>
          </div>
        ))}
        {/* <div className="absolute z-[-1] right-[-10rem] top-0 w-[40%] h-[70%] rounded-full blue_gradient" /> */}
      </div>

      <div className="fixed bottom-[4.8rem] right-8 z-10 text-right py-4 cursor-pointer">
        <i
          className="fad fa-plus-circle text-right"
          style={{ fontSize: "3rem" }}
          onClick={() => {
            setAddToggle(prev => !prev)
          }}
        />
      </div>
    </section>
  );
};

export default memo(Playlist);
