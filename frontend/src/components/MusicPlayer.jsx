import { useEffect, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AudioHook from "../hooks/AudioHook";
import { styles } from "../style";
import { axiosPrivate } from "../api/axios";

const MusicPlayer = () => {
  const navigate = useNavigate();
  const {
    formatTime,
    handleMute,
    handleProgress,
    togglePlayPause,
    handleVolumeChange,
    handleRepeat,
  } = AudioHook();
  const currentSong = useSelector((state) => state.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const isRepeat = useSelector((state) => state.player.isRepeat);
  const volumeLevel = useSelector((state) => state.volumeLevel);
  const songDuration = useSelector((state) => state.player.duration);
  const progress = useSelector((state) => state.player.progress);
  const isMuted = useSelector((state) => state.player.isMuted);
  // const isShuffle = useSelector((state) => state.player.isShuffle);

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
    console.log("Component MusicPlayer");
  }, []);

  useEffect(() => {
    setLocalLike(currentSong?.liked);
  }, [currentSong]);

  return (
    <div className={`${styles.paddingX}`}>
      <div className="flex flex-row">
        <div className="flex items-center">
          <img
            src={currentSong?.song_art}
            alt={currentSong?._id || "song_art_image"}
            className="w-[50px] h-[50px] object-cover rounded-full cursor-pointer overflow-hidden"
            onClick={() => navigate("/app/player")}
          />
          {/* Info */}
          <div className="flex flex-1 flex-col ml-4 w-24 overflow-x-hidden">
            <p className="text-[13px] font-semibold cursor-pointer hover:text-dimWhite text-nowrap">
              {currentSong?.title?.slice(0, 15) || "Title"}
            </p>
            <p className="text-[13px] text-dimWhite cursor-pointer hover:text-white text-nowrap">
              {currentSong?.contributors.join(", ").slice(0, 10) || "Title"}
            </p>
          </div>
          {/* Play buttons */}
          <div className="flex flex-row justify-between w-52 px-4 items-center text-[23px]">
            <i
              className={`ml-1 ${styles.hoverColor} fad fa-star  ${
                localLike
                  ? "text-[#0053b9] hover:text-[#4a9124] "
                  : "hover:text-[#6093d2]"
              }`}
              style={{ fontSize: "0.8rem" }}
              onClick={toggleLike}
            />

            <i
              className={`${styles.hoverColor} fad fa-backward`}
              style={{ fontSize: "1rem" }}
            />
            <i
              className={`${styles.hoverColor} fa fa-${
                isPlaying ? "pause" : "play"
              }`}
              onClick={togglePlayPause}
            />
            {/* <i className={`${styles.hoverColor} fa fa-forward`} style={{ fontSize: '1rem' }} /> */}
            <i
              className={`${styles.hoverColor} fad fa-forward`}
              style={{ fontSize: "1rem" }}
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
        {/* Range controllers */}
        <div className="flex-1 items-center sm:flex hidden">
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
          <div className="flex text-[20px] items-center px-6">
            <i
              className={`${styles.hoverColor} fad fa-volume-${
                isMuted
                  ? "mute"
                  : volumeLevel >= 50
                  ? "up"
                  : volumeLevel <= 0
                  ? "off"
                  : "down"
              } pr-4`}
              onClick={handleMute}
            />
            <label htmlFor="volume_slider"></label>
            <input
              aria-label="volume_slider"
              type="range"
              max={100}
              min={0}
              step={2}
              value={volumeLevel}
              onChange={handleVolumeChange}
              className="w-20 md:inline hidden slider"
              style={{
                background: `linear-gradient(to right, #99004d ${volumeLevel}%, #ddd ${volumeLevel}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MusicPlayer);
