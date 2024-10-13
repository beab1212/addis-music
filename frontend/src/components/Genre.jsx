import { useEffect, memo, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../api/axios";

const Genre = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  useEffect(() => {
    axiosPrivate
      .get("/genre/available")
      .then((res) => {
        setData(res.data?.genre);
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
    console.log("Component Genre");
  }, []);
  return (
    <section className="">
      <div className="sm:py-10 sm:bg-gradient-to-b from-[#6303ff] to-[#121212]">
        <h1 className="text-[38px] font-semibold mb-8 ml-8">GENRE</h1>
      </div>
      <div className="flex relative flex-wrap justify-between gap-6 z-[5] m-4">
        {data?.map((genre, index) => (
          <div
            key={genre._id}
            className="flex relative sm:w-[300px] w-[45%] lg:mb-8x mb-6x h-[150px] rounded-lg overflow-hidden cursor-pointer hover:rounded-2xl shadow shadow-blue-800/40 hover:shadow-indigo-800/40"
          >
            <img
              src={genre.image + "_400"}
              alt={genre.name}
              className="w-[100%] h-full object-cover"
            />
            <h1
              className="absolute bottom-2 left-2 font-semibold text-[1.5rem]"
              style={{ textShadow: "black 5px 5px 10px" }}
            >
              {genre.name}
            </h1>
          </div>
        ))}
        <div className="absolute z-[-1] right-[-10rem] top-0 w-[40%] h-[70%] rounded-full blue_gradient" />
      </div>
    </section>
  );
};

export default memo(Genre);
