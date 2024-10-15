import { useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hls from "hls.js";

const AudioComponent = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const audioSrc = useSelector((state) => state.player.audioSrc);
  const isPlaying = useSelector((state) => state.player.isPlaying);

  useEffect(() => {
    let hls;
    if (Hls.isSupported()) {
      hls = new Hls({
        xhrSetup: (xhr, url) => {
          xhr.withCredentials = true;
        },
      });
      hls.loadSource(audioSrc);
      hls.attachMedia(audioRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        //
      });

      hls.on(Hls.Events.AUDIO_TRACK_LOADED, () => {
        //
      });

      audioRef.current?.addEventListener("loadeddata", () => {
        const promise = audioRef.current.play();
        if (promise !== undefined) {
          promise
            .then((_) => {
              // Autoplay started!
              if (!isPlaying) {
                dispatch({ type: "PLAY" });
              }
            })
            .catch((error) => {
              // Autoplay was prevented.
            });
        }
      });

      audioRef.current.addEventListener("loadedmetadata", () => {
        dispatch({ type: "SET_DURATION", payload: audioRef.current.duration });
      });

      audioRef.current?.addEventListener("ended", () => {
        dispatch({ type: "PAUSE" });
      });
    }
    return () => {
      hls.destroy();
    };
  }, [audioSrc]);

  useEffect(() => {
    dispatch({ type: "SET_AUDIO_REF", payload: audioRef });
  }, [dispatch]);

  useEffect(() => {
    
  }, []);
  return (
    <div>
      <audio ref={audioRef}></audio>
    </div>
  );
};

export default memo(AudioComponent);
