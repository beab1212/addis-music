import { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import { addisMusic } from "../assets";
import { styles } from "../style";
import { useSelector } from "react-redux";
import AudioHook from "../hooks/AudioHook";
import { axiosPrivate } from "../api/axios";

const MaxPlayer = () => {
  const navigate = useNavigate();
  const { formatTime, handleProgress, togglePlayPause, handleRepeat } =
    AudioHook();
  const currentSong = useSelector((state) => state.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const progress = useSelector((state) => state.player.progress);
  const isRepeat = useSelector((state) => state.player.isRepeat);
  const songDuration = useSelector((state) => state.player.duration);

  const [localLike, setLocalLike] = useState(currentSong?.liked);
  const toggleLike = () => {
    axiosPrivate
      .post(`/song/${currentSong?._id}/like`)
      .then((res) => {
        setLocalLike(res.data?.like);
      })
      .catch((err) => {
        // nothing to do
      });
  };

  useEffect(() => {
  }, []);

  useEffect(() => {
    setLocalLike(currentSong?.liked);
  }, [currentSong]);

  return (
    <div className="col-span-full bg-[#121212] h-full overflow-hidden rounded-lg pt-2l">
      <section className="bg-[#121212] h-full">
        <div className="flex flex-col pt-3 px-4 -ml-10l h-full">
          <div className="">
            <i
              className="fad fa-arrow-left cursor-pointer"
              style={{ fontSize: "1.2rem" }}
              onClick={() => navigate(-1)}
            />
          </div>
          <div className="items-center sm:pt-20 pt-40 h-full">
            <div className="relative">
              <div
                className={`relative w-[18rem] h-[18rem] mx-auto rounded-full overflow-hidden`}
              >
                <img
                  src={currentSong?.song_art + "_400"}
                  alt="song_art"
                  className={`w-full h-full object-cover slow-spin  ${
                    !isPlaying && "paused"
                  } `}
                />
                <div className="absolute flex bg-[#121212] rounded-full w-16 h-16 borderx top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center">
                  <img
                    src={addisMusic}
                    alt="addis_music"
                    className="w-[70%] object-cover mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-14 h-full justify-end pb-8">
            <div className="flex flex-col">
              <div className="flex flex-1 md:w-1/2 w-full items-center mx-auto">
                <p className="text-dimWhite text-[14px]">
                  {progress.time ? progress.time : "0:00"}
                </p>
                <input
                  aria-label="progress_bar"
                  type="range"
                  min={0}
                  step={0.01}
                  max={100}
                  value={progress.percent}
                  onChange={handleProgress}
                  className="w-full mx-4 slider"
                  style={{
                    background: `linear-gradient(to right, #99004d ${progress.percent}%, #ddd ${progress.percent}%)`,
                  }}
                />
                <p className="text-dimWhite text-[14px]">
                  {songDuration ? formatTime(songDuration) : "00:00"}
                </p>
              </div>

              <div className="flex lg:w-1/4 md:w-1/3 sm:w-1/2 w-[90%] justify-between items-center mx-auto mt-6 md:mt-6">
                {/* <i
                  className={`${styles.hoverColor} fad fa-light fa-repeat`}
                  style={{ fontSize: "1rem" }}
                /> */}
                <i
                  className={`ml-1 ${styles.hoverColor} fad fa-star  ${
                    localLike
                      ? "text-[#0053b9] hover:text-[#4a9124] "
                      : "hover:text-[#6093d2]"
                  }`}
                  style={{ fontSize: "1rem" }}
                  onClick={toggleLike}
                />

                <i
                  className={`${styles.hoverColor} fad fa-backward`}
                  style={{ fontSize: "1.4rem" }}
                />
                <i
                  className={`${styles.hoverColor} fad fa-${
                    isPlaying ? "pause pl-[0.85rem]" : "play pl-[0.95rem]"
                  } p-3 h-14 w-14 rounded-full border`}
                  onClick={togglePlayPause}
                  style={{ fontSize: "2rem" }}
                />
                <i
                  className={`${styles.hoverColor} fad fa-forward`}
                  style={{ fontSize: "1.4rem" }}
                />
                <i
                  className={`${styles.hoverColor} fad fa-light fa-repeat ${
                    isRepeat ? "text-[#0053b9] hover:text-[#6093d2] " : ""
                  }`}
                  style={{ fontSize: "1rem" }}
                  onClick={handleRepeat}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(MaxPlayer);
