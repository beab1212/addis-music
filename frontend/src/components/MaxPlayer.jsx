import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";
import { hana } from "../assets";
import { styles } from "../style";
import { useSelector } from "react-redux";
import AudioHook from "../hooks/AudioHook";

const MaxPlayer = () => {
  const navigate = useNavigate();
  const {
    handleProgress,
    togglePlayPause,
    handleRepeat,
  } = AudioHook();
  
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const progress = useSelector((state) => state.player.progress);
  const isRepeat = useSelector((state) => state.player.isRepeat);

  useEffect(() => {
    console.log('Component MaxPlayer');
  }, [])
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
          <div className="items-center">
            <img
              src={hana}
              alt="song_art"
              className="w-[18rem] rounded-full object-contain mx-auto"
            />
          </div>

          <div className="flex flex-col mt-14">
            <div className="flex flex-1 md:w-1/2 w-full items-center mx-auto">
              <p className="text-dimWhite text-[14px]">
                {progress.time ? progress.time : "0:00"}
              </p>
              <input
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
              <p className="text-dimWhite text-[14px]">{"33:3"}</p>
            </div>
          </div>

          <div className="flex flex-row items-center py-4 justify-center mt-6 md:mt-10">
            <div className="flex md:w-1/6 w-full justify-between items-center">
              <i
                className={`${styles.hoverColor} fad fa-light fa-repeat`}
                style={{ fontSize: "1rem" }}
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
                className={`${styles.hoverColor} fad fa-light fa-repeat ${isRepeat ? 'text-[#0053b9] hover:text-[#6093d2] ' : ''}`}
                style={{ fontSize: "1rem" }}
                onClick={handleRepeat}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(MaxPlayer);
