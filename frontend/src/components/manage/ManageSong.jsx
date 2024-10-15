import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../../api/axios";

const ManageSong = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState("false");
  const [toggle, setToggle] = useState(false);
  const [currentUpdated, setCurrentUpdated] = useState(null);

  const handleDelete = (e, song_id) => {
    // Prevent click bubbling to parent div
    e.stopPropagation();
    axiosPrivate
      .delete(`/song/${song_id}`)
      .then((res) => {
        setRefresh(song_id);
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
      .get("/song/my")
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
  }, [refresh]);

  return (
    <div className="">
      <UpdateSong
        toggle={toggle}
        setToggle={setToggle}
        currentUpdated={currentUpdated}
        setRefresh={setRefresh}
      />
      {data.map((song, index) => (
        <SongTemplate
          key={song._id}
          index={index}
          song={song}
          handleDelete={handleDelete}
          setToggle={setToggle}
          setCurrentUpdated={setCurrentUpdated}
        />
      ))}
    </div>
  );
};

const SongTemplate = (probs) => {
  return (
    <div className="flex flex-row">
      <div
        className={`flex flex-row items-center py-4 px-2 rounded-lg w-full cursor-pointer hover:bg-gray-800`}
      >
        <h4 className="text-[1.1rem] mr-4">{probs.index + 1}</h4>
        <img
          src={probs.song.song_art + "_100"}
          alt={probs._id}
          className="w-[40px] h-[40px] object-cover overflow-hidden min-w-[40px]"
        />
        <div className="flex flex-col ml-4 min-w-32 max-w-40 overflow-hidden">
          <h5
            className={`text-[13px] font-semibold cursor-pointer hover:text-dimWhite text-nowrap`}
          >
            {probs.song.title}
          </h5>
          <h6
            className={`text-[13px] text-dimWhite cursor-pointer hover:text-white text-nowrap `}
          >
            {probs.song.contributors?.join(", ")}
          </h6>
        </div>
        <p className={`text-dimWhite text-[13px] text-end w-full`}>{}</p>

        <div className="flex flex-row">
          <i
            className={`mx-4 fad fa-edit hover:text-green-600`}
            onClick={() => {
              probs.setCurrentUpdated(probs.song);
              probs.setToggle(true);
            }}
          />

          <i
            className={`mx-4 fad fa-trash hover:text-red-600`}
            onClick={(e) => {
              probs.handleDelete(e, probs.song._id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

const UpdateSong = (probs) => {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [form, setForm] = useState({
    title: "",
    contributors: "",
    genre: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (
      probs.currentUpdated.title === form.title &&
      probs.currentUpdated.description === form.description &&
      probs?.currentUpdated?.contributors?.join(", ") === form.contributors
    ) {
      dispatch({
        type: "SHOW_ALERT",
        payload: {
          message: "Nothing is new to update with",
          type: "warning",
          dismiss: 9000,
        },
      });
    } else {
      axiosPrivate
        .post(`/song/${probs?.currentUpdated?._id}`, form)
        .then((res) => {
          dispatch({
            type: "SHOW_ALERT",
            payload: {
              message: res.data?.message,
              type: "success",
              dismiss: 9000,
            },
          });
          probs.setToggle(false);
          probs.setRefresh(Math.random());
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
    }
  };

  useEffect(() => {
    setForm({
      title: probs?.currentUpdated?.title,
      contributors: probs?.currentUpdated?.contributors?.join(", "),
      genre: probs?.currentUpdated?.genre,
      description: probs?.currentUpdated?.description,
    });

    axiosPrivate
      .get("/genre/available")
      .then((res) => {
        setGenres(res.data?.genre);
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
  }, [probs.currentUpdated]);

  return (
    <div className={`fixed w-full z-50 ${probs.toggle ? "block" : "hidden"}`}>
      <div className="sm:max-w-[400px] bg-gray-900 mx-auto p-6 rounded-lg max-sm:w-full max-sm:-ml-4">
        <h1 className="text-[1.5rem] font-semibold mb-2">Update Song</h1>
        <form action="" onSubmit={handleUpdate}>
          <div className="">
            <label
              htmlFor="title"
              className="mb-2.5 block text-base font-medium text-dark text-white"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Edit song name"
              className="w-full rounded-lg border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary text-gray-900"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="">
            <label
              htmlFor="contributors"
              className="mb-2.5 block text-base font-medium text-dark text-white"
            >
              Contributors
            </label>
            <input
              type="text"
              name="contributors"
              placeholder="Edit contributors list"
              className="w-full rounded-lg border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary text-gray-900"
              value={form.contributors}
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="genre"
              className="mb-2.5 block text-base font-medium text-dark text-white"
            >
              Genre
            </label>
            <select
              name="genre"
              className="w-full appearance-none rounded-lg border border-stroke py-3 pl-5 pr-12 text-gray-900 outline-none focus:border-primary "
              value={form.genre}
              onChange={handleChange}
            >
              <option value="">Select song genre</option>
              {genres.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <label
              htmlFor="description"
              className="mb-2.5 block text-base font-medium text-dark text-white"
            >
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Edit description"
              className="w-full rounded-lg border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary text-gray-900"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-row mt-4 justify-between">
            <button
              className="flex h-12 items-center justify-center rounded-lg border border-stroke bg-transparent px-6 py-3 font-medium text-dark duration-200 hover:border-dark hover:bg-dark hover:text-white dark:border-dark-3 dark:text-dark-7 dark:hover:border-dark dark:hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                probs.setToggle(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex h-12 items-center justify-center rounded-lg border border-transparent bg-green-800 px-6 py-3 font-medium text-white duration-200 hover:bg-green-950"
            >
              Update Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageSong;
