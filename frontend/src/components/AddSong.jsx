import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../api/axios";

const AddSong = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [geners, setGenres] = useState([]);
  const [form, setForm] = useState({
    song_art: "",
    song: "",
    title: "",
    contributors: "",
    genre: "",
    description: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "song_art" || e.target.name === "song") {
      setForm((prev) => {        
        return { ...prev, [e.target.name]: e.target.files[0] };
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
      .post("/song", form, {
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
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            message: err.response.data?.error,
            type: "warning",
            dismiss: 9000,
          },
        });
      });
  };

  useEffect(() => {
    axiosPrivate
      .get("/genre/available")
      .then((res) => {        
        setGenres(res.data?.genre);
      })
      .catch((err) => {
        //
      });
  }, []);

  return (
    <section className="col-span-full bg-[#121212] h-full overflow-x-hidden rounded-lg pt-2l overflow-y-scroll customScroll">
      <div className="pt-3 px-4">
        <i
          className="fad fa-arrow-left cursor-pointer"
          style={{ fontSize: "1.2rem" }}
          onClick={() => navigate(-1)}
        />
      </div>
      <div className="container mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="relative mx-auto w-full max-w-[650px] rounded-xl bg-whitex shadow-lg bg-gray-900x">
            <div className="px-7 py-8">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-dark dark:text-white">
                  Upload Song Art
                </h3>
                <p className="text-base text-body-color dark:text-dark-6">
                  You can only upload file at a time. File limit is 2 MB.
                </p>
              </div>

              <div className="mb-6">
                <label
                  htmlFor=""
                  className="flex min-h-[220px] items-center justify-center rounded-lg border border-dashed border-dark-6 bg-gray-1 p-5 dark:border-dark-3 dark:bg-white/5"
                >
                  <div>
                    <div className="mx-auto mb-5 flex aspect-square w-[68px] items-center justify-center rounded-full bg-gray-3 text-dark dark:bg-white/5 dark:text-white">
                      <svg
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M24.5438 4.85623H14.4376L13.5188 3.10623C13.0376 2.23123 12.1626 1.66248 11.1563 1.66248H3.45635C1.96885 1.66248 0.787598 2.84373 0.787598 4.33123V23.6687C0.787598 25.1562 1.96885 26.3375 3.45635 26.3375H24.5876C26.0751 26.3375 27.2563 25.1562 27.2563 23.6687V7.52498C27.2563 6.03748 26.0313 4.85623 24.5438 4.85623ZM25.2876 23.6687C25.2876 24.0625 24.9813 24.3687 24.5876 24.3687H3.45635C3.0626 24.3687 2.75635 24.0625 2.75635 23.6687V4.33123C2.75635 3.93748 3.0626 3.63123 3.45635 3.63123H11.1563C11.4188 3.63123 11.6376 3.76248 11.7688 4.02498L12.9938 6.29998C13.1688 6.60623 13.5188 6.82498 13.8688 6.82498H24.5876C24.9813 6.82498 25.2876 7.13123 25.2876 7.52498V23.6687Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M14.7003 10.675C14.3065 10.2812 13.694 10.2812 13.3003 10.675L9.49404 14.4375C9.10029 14.8312 9.10029 15.4437 9.49404 15.8375C9.88779 16.2312 10.5003 16.2312 10.894 15.8375L13.0378 13.7375V20.125C13.0378 20.65 13.4753 21.1312 14.044 21.1312C14.6128 21.1312 15.0065 20.6937 15.0065 20.125V13.6937L17.194 15.8375C17.369 16.0125 17.6315 16.1 17.894 16.1C18.1565 16.1 18.419 16.0125 18.594 15.7937C18.9878 15.4 18.9878 14.7875 18.594 14.3937L14.7003 10.675Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <p className="mb-2 text-center text-base text-dark-4 dark:text-dark-6">
                        Drag and drop your files here or
                        <br />
                        <button className="font-medium text-primary">
                          Browse
                        </button>
                        <input
                          type="file"
                          name="song_art"
                          onChange={handleChange}
                        />
                      </p>
                      <p className="text-center text-sm text-dark-4 dark:text-dark-6">
                        Max 2 MB files are allowed
                      </p>
                    </div>
                  </div>
                </label>
              </div>

              <div>
                <div className="space-y-3 text-gray-800">
                  <div className="w-full">
                    <label className="mb-2.5 block text-base font-medium text-dark dark:text-white">
                      Upload a Song File:
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        name="song"
                        onChange={handleChange}
                        className="w-full rounded-lg border border-stroke p-3 text-body-color outline-none duration-200 file:mr-4 file:rounded file:border-[.5px] file:border-stroke file:bg-gray-3 file:px-3 file:py-1 file:text-base file:text-dark focus:border-primary active:border-primary dark:border-dark-3 dark:text-dark-6 dark:file:border-dark-3 dark:file:bg-dark-3 dark:file:text-whitx"
                      />
                    </div>
                  </div>

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
                      placeholder="Enter you song title"
                      className="w-full rounded-lg border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary"
                      value={form.title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="">
                    <label
                      htmlFor="title"
                      className="mb-2.5 block text-base font-medium text-dark text-white"
                    >
                      Contributors
                    </label>
                    <input
                      type="text"
                      name="contributors"
                      placeholder="Enter name of contributors like writer, composer..."
                      className="w-full rounded-lg border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary"
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
                      className="w-full appearance-none rounded-lg border border-stroke py-3 pl-5 pr-12 text-dark outline-none focus:border-primary dark:border-dark-3x dark:text-whitex"
                      value={form.genre}
                      onChange={handleChange}
                    >
                      <option value="">Select song genre</option>
                      {geners.map((genre) => (
                        <option key={genre._id} value={genre._id}>
                          {genre.name}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-0 top-4 flex h-full w-12 items-center justify-center text-dark-5">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.29645 5.15354L2.29642 5.15357L2.30065 5.1577L7.65065 10.3827L8.00167 10.7255L8.35105 10.381L13.7011 5.10603L13.7011 5.10604L13.7036 5.10354C13.7221 5.08499 13.7386 5.08124 13.75 5.08124C13.7614 5.08124 13.7779 5.08499 13.7964 5.10354C13.815 5.12209 13.8188 5.13859 13.8188 5.14999C13.8188 5.1612 13.8151 5.17734 13.7974 5.19552L8.04956 10.8433L8.04955 10.8433L8.04645 10.8464C8.01604 10.8768 7.99596 10.8921 7.98519 10.8992C7.97756 10.8983 7.97267 10.8968 7.96862 10.8952C7.96236 10.8929 7.94954 10.887 7.92882 10.8721L2.20263 5.2455C2.18488 5.22733 2.18125 5.2112 2.18125 5.19999C2.18125 5.18859 2.18501 5.17209 2.20355 5.15354C2.2221 5.13499 2.2386 5.13124 2.25 5.13124C2.2614 5.13124 2.2779 5.13499 2.29645 5.15354Z"
                          fill="currentColor"
                          stroke="currentColor"
                        ></path>
                      </svg>
                    </span>
                  </div>

                  <div className="">
                    <label
                      htmlFor="title"
                      className="mb-2.5 block text-base font-medium text-dark text-white"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      name="description"
                      placeholder="Enter song description"
                      className="w-full rounded-lg border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary"
                      value={form.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 border-t border-stroke px-7 py-5 dark:border-dark-3">
              <button
                className="flex h-12 items-center justify-center rounded-lg border border-stroke bg-transparent px-6 py-3 font-medium text-dark duration-200 hover:border-dark hover:bg-dark hover:text-white dark:border-dark-3 dark:text-dark-7 dark:hover:border-dark dark:hover:text-white"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex h-12 items-center justify-center rounded-lg border border-transparent bg-primary px-6 py-3 font-medium text-white duration-200 hover:bg-primary/90"
              >
                Add Song
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default memo(AddSong);
