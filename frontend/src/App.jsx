import "./App.css";
// import "font-awesome/css/font-awesome.min.css";
import "./assets/font-awesome-1-master/css/all.css";
// import { styles } from "./style";
import {
  AudioComponent,
  Genre,
  TrackList,
  Playlist,
  SmallAlert,
  MaxPlayer,
  AppLayout,
  Signin,
  Signup,
  AddSong,
} from "./components";
import { useEffect, memo } from "react";
import { Routes, Route } from "react-router-dom";

// TODO: don't forget to implement lazy loading image
function App() {
  useEffect(() => {
    console.log("Debugging from main App component");
  }, []);
  return (
    <div className="bg-[#000000] w-full h-screen text-white overflow-hidden">
      <SmallAlert/>
      <AudioComponent />
      <Routes>
        <Route path="/">
          <Route path="signin" Component={Signin} />
          <Route path="signup" Component={Signup} />
        </Route>
        
        <Route path="/app/player" Component={MaxPlayer}/>
        <Route path="/app/add/song" Component={AddSong}/>
        <Route path="/app" element={<AppLayout />}>
          <Route path="" Component={Genre} />
          <Route path="genre" Component={Genre} />
          <Route path="track" Component={TrackList} />
          <Route path="playlist" Component={Playlist} />
        </Route>
      </Routes>
    </div>
  );
}

export default memo(App);
