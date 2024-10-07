import { useEffect, useRef, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hls from "hls.js";


const AudioComponent = () => {
  const audioRef = useRef(null);
  const dispatch = useDispatch();
  const audioSrc = useSelector((state) => state.player.audioSrc);
  const songDuration = useSelector((state) => state.player.duration);

  useEffect(() => {
    let hls;
    if (Hls.isSupported()) {
      hls = new Hls({
        xhrSetup: (xhr, url) => {
          // Configure xhr requests to include credentials (cookies)
          xhr.withCredentials = true;
        },
      });
      // TODO: Source url uses auth but this method send request without cookie
      hls.loadSource(audioSrc);
      hls.attachMedia(audioRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        // audioRef.current.play();
      });
      hls.on(Hls.Events.AUDIO_TRACK_LOADED, () => {
        // if (isPlaying) {
        //   // audioRef.current.play();
        // }
        audioRef.current.play();
      });

      // audioRef.current?.addEventListener("timeupdate");
      // This event fires when the audio's first frame is fully loaded.
      audioRef.current?.addEventListener('loadeddata', () => {
        console.log('=========Audio is loaded and ready to play');
      });

      audioRef.current.addEventListener('loadedmetadata', () => {
        dispatch({ type: 'SET_DURATION', payload: audioRef.current.duration })
      });

      audioRef.current?.addEventListener('ended', () => {
        dispatch({ type: 'TOGGLE_PLAY_PAUSE' })
      })
    }
    return () => {
      hls.destroy();
    };
  }, [audioSrc]);

  useEffect(() => {
    dispatch({ type: "SET_AUDIO_REF", payload: audioRef });
  }, [dispatch])

  useEffect(() => {
    console.log('Component AudioComponent');
  }, [])
  return (
    <div>
      <audio ref={audioRef}></audio>
    </div>
  );
};

export default memo(AudioComponent);
