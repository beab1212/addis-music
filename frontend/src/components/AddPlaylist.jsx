import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";

const AddPlaylist = (probs) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    playlist_art: "",
    is_public: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "playlist_art") {
      setForm((prev) => {
        return { ...prev, [e.target.name]: e.target.files[0] };
      });
    } else if (e.target.name === "is_public") {
      setForm((prev) => {
        return { ...prev, [e.target.name]: e.target.checked };
      });
    } else {
      setForm((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosPrivate
      .post("/playlist", form, {
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
        navigate(`/app/playlist/${res.data?.playlist?._id}`);
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
              Playlist Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter playlist name"
              className="w-full rounded-lg border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary text-gray-900"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <label
              htmlFor="playlist_art"
              className="mb-2.5 block text-base font-medium text-dark text-white"
            >
              Playlist Art
            </label>
            <input
              type="file"
              name="playlist_art"
              className="w-full rounded-lg border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary"
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <input
              type="checkbox"
              name="is_public"
              value="yes"
              onChange={handleChange}
            />
            <p className="inline"> is Public</p>
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

export default AddPlaylist;
