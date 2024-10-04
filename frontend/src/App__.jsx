import { useEffect, useRef } from "react";
import "./App.css";
import "font-awesome/css/font-awesome.min.css";
import Signup from "./components/market/Signup";
import Signin from "./components/market/Signin";


function App() {
  const hlsAudioSrc = 'http://localhost:5000/audio/output.m3u8';

  return (
    <div className="w-full flex items-centerr h-screen border-red-600 overflow-y-scroll customScroll bg-[#121212]">
      {/* <Signup /> */}
      <Signin />
    </div>
  );
}

export default App;
