import { useEffect, memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";

const Album = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosPrivate
      .get("/album")
      .then((res) => {
        setData(res.data?.albums);
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
    console.log("Component Album");
  }, []);
  return (
    <section className="grid sm:grid-rows-[150px_1fr]">
      <div className="sm:py-10 sm:bg-gradient-to-b from-[#e04141af] to-[#121212]">
        <h1 className="text-[38px] font-semibold mb-8 ml-8 uppercase">
          Album
        </h1>
      </div>
      <div
        className="flex flex-wrap gap-5 justify-between relative z-[5] m-4 customScroll overflow-hidden overflow-y-scroll scroll-smooth"
      >
        {data?.map((album) => (
          <div
            key={album._id}
            className={`flex relative rounded-lg cursor-pointer overflow-hidden hover:bg-gray-800 sm:w-[10rem] w-full max-h-40`}
            onClick={() => navigate(`/app/album/${album?._id}`)}
          >
            <img
              src={album.album_art}
              alt={album._id}
              className="w-full object-cover"
            />

            <div className="absolute bottom-0 flex w-full flex-col bg-gradient-to-b from-[#2828281a] to-[#000000] pl-2">
              <h5 className="md:text-[14px] text-[24px] font-semibold cursor-pointer hover:text-dimWhite">
                {album.title}
              </h5>
              <h6 className="text-[13px] text-dimWhite cursor-pointer hover:text-white">
                {album.title}
              </h6>
            </div>
          </div>
        ))}
        {/* <div className="absolute z-[-1] right-[-10rem] top-0 w-[40%] h-[70%] rounded-full blue_gradient" /> */}
      </div>
    </section>
  );
};

export default memo(Album);
