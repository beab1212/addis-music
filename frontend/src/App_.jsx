import "./App.css";
// import "font-awesome/css/font-awesome.min.css";
import "./assets/font-awesome-1-master/css/all.css";
// import { styles } from "./style";
import {
  Header,
  SideBar,
  Genre,
  TrackList,
  MusicPlayer,
  Playlist,
  MaxPlayer,
} from "./components";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// TODO: don't forget to implement lazy loading image
function App() {
  useEffect(() => {
    console.log("Debugging from main App component");
  }, []);
  if (true) {
    return (
      <div className="bg-[#000000] w-full h-screen text-white overflow-hidden">
        <div
          className={`grid grid-cols-[1fr_1fr_1fr_1fr] grid-rows-[56px_1fr_60px] gap-4 h-screen mx-auto sm:px-2 px-1`}
        >
          <div className="col-span-full flex items-center overflow-hidden bg-[#121212] rounded-lg">
            <Header />
          </div>

          {/* TODO: make this 2 row  */}
          {/* <div className="col-span-full bg-[#121212] overflow-hidden rounded-lg pt-2l"> */}
            {/* <MusicPlayer /> */}
            {/* <MaxPlayer /> */}
          {/* </div> */}
          <Routes>
            <Route path="/player" Component={MaxPlayer} />
          </Routes>

          <div className="bg-[#121212] rounded-lg overflow-y-scroll scroll-smooth customScroll">
            <SideBar />
          </div>

          {/* Central section AKA Route */}
          <div className="col-start-2 col-end-5 bg-[#121212] rounded-lg overflow-y-scroll overflow-x-hidden scroll-smooth customScroll">
            <section className={`borderx border-green-500`}>
              <Routes>
                <Route path="/genre" Component={Genre} />
                <Route path="/track" Component={TrackList} />
                <Route path="/playlist" Component={Playlist} />
              </Routes>
              {/* <Genre /> */}
              {/* <TrackList /> */}
              {/* <Playlist /> */}
            </section>
          </div>

          <div className="col-span-full bg-[#121212] rounded-lg pt-2">
            <MusicPlayer />
          </div>
        </div>
      </div>
    );
  } else {
    console.log("For unauthenticated user");
    return <div className="bg-[#000000] w-full h-screen text-white"></div>;
  }
}

export default App;
