import { useEffect, memo, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
// import "font-awesome/css/font-awesome.min.css";
import "./assets/font-awesome-1-master/css/all.css";
// import { styles } from "./style";

const Home = lazy(() => import('./components/market/Home'));
const Signin = lazy(() => import('./components/market/Signin'));
const Signup = lazy(() => import('./components/market/Signup'));
const AudioComponent = lazy(() => import('./components/AudioComponent'))
const SmallAlert = lazy(() => import('./components/Alert'))
const MaxPlayer = lazy(() => import('./components/MaxPlayer'));
const AddSong = lazy(() => import('./components/AddSong'));
const Genre = lazy(() => import('./components/Genre'));
const Discover = lazy(() => import('./components/Discover'));
const Playlist = lazy(() => import('./components/Playlist'));
const PlaylistSong = lazy(() => import('./components/PlaylistSong'));
const AppLayout = lazy(() => import('./components/AppLayout'));
const Favorites = lazy(() => import('./components/Favorites'));
const Foryou = lazy(() => import('./components/Foryou'));


// TODO: don't forget to implement lazy loading image
function App() {
  useEffect(() => {
    console.log("Debugging from main App component");
  }, []);
  return (
    <div className="bg-[#000000] w-full h-screen text-white overflow-hidden">
      <SmallAlert/>
      
      <Suspense>
        <AudioComponent />
      </Suspense>

      <Routes>
        <Route path="/">
          <Route path="/" element={<LazyComponent Component={Home} />} />
          <Route path="signin" element={<LazyComponent Component={Signin} />} />
          <Route path="signup" Component={Signup} element={<LazyComponent Component={Signup} />} />
        </Route>
        
        <Route path="/app/player" element={<LazyComponent Component={MaxPlayer} />}/>
        <Route path="/app/song/upload"element={<LazyComponent Component={AddSong} />} />
        <Route path="/app" element={<AppLayout />}>
          <Route path="" Component={Foryou} />
          <Route path="genre" Component={Genre} />
          <Route path="foryou" Component={Foryou} />
          <Route path="discover" Component={Discover} />
          <Route path="favorite" Component={Favorites} />
          <Route path="playlist" Component={Playlist} />
          <Route path="playlist/:id" Component={PlaylistSong} />
        </Route>
      </Routes>
    </div>
  );
}

const LazyComponent = ({ Component }) => (
  <Suspense fallback={<div><h1 className="text-[20px] text-red-500">Loading...</h1></div>}>
    <Component />
  </Suspense>
);

export default memo(App);
