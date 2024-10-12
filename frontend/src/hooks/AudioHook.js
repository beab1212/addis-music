import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosPrivate } from "../api/axios";

const AudioHook = () => {
  const audioRef = useSelector((state) => state.audioRef);
  const currentSong = useSelector((state) => state.currentSong);
  const isPlaying = useSelector((state) => state.player.isPlaying);
  const isMuted = useSelector((state) => state.player.isMuted);
  const isRepeat = useSelector((state) => state.player.isRepeat);
  const progress = useSelector((state) => state.player.progress);
  // const isShuffle = useSelector((state) => state.player.isShuffle);

  const dispatch = useDispatch();

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return formattedTime === 'NaN:NaN' ? '00:00' : formattedTime;
  };

  const updateProgress = () => {
    if (audioRef.current?.currentTime) {
      dispatch({
        type: "UPDATE_PROGRESS",
        payload: {
          percent:
            (audioRef.current.currentTime * 100) / audioRef.current.duration,
          time: formatTime(audioRef.current.currentTime),
        },
      });
    } else {
      dispatch({
        type: "UPDATE_PROGRESS",
        payload: { percent: progress.percent, time: "0:00" },
      });
    }
  };

  const handleProgress = (e) => {
    const newTime = (e.target.value * audioRef.current.duration) / 100;
    if (audioRef.current?.currentTime) {
      audioRef.current.currentTime = newTime;
    }
  };

  const togglePlayPause = (e) => {
    dispatch({ type: "TOGGLE_PLAY_PAUSE" });
    if (audioRef.current?.readyState !== 0) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  const changePlay = (song) => {
    if (song._id === currentSong) {
      return null;
    }

    // new approach
    axiosPrivate
      .get(`/song/${song?._id}`)
      .then((res) => {
        dispatch({
          type: "SET_AUDIO_SOURCE",
          payload: res.data?.song.stream_url,
        });
        dispatch({ type: "SET_CURRENT_SONG", payload: res.data?.song });
      })
      .catch((err) => {
        //
      });
    // old approach before like button
    // dispatch({ type: 'SET_AUDIO_SOURCE', payload: song.stream_url });
    // dispatch({ type: 'SET_CURRENT_SONG', payload: song });
  };

  const handleVolumeChange = (e) => {
    dispatch({ type: "SET_VOLUME", payload: e.target.value });
    audioRef.current.volume = e.target.value / 100;
  };

  const handleMute = () => {
    audioRef.current.muted = !isMuted;
    dispatch({ type: "TOGGLE_MUTE" });
  };

  const handleRepeat = () => {
    dispatch({ type: "SET_REPEAT" });
    audioRef.current.loop = !isRepeat;
  };

  useEffect(() => {
    audioRef?.current?.addEventListener("timeupdate", updateProgress);
  }, [audioRef?.current]);

  return {
    updateProgress,
    formatTime,
    handleMute,
    handleProgress,
    togglePlayPause,
    handleVolumeChange,
    handleRepeat,
    changePlay,
  };
};

export default AudioHook;
