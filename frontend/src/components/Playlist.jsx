import { useEffect, memo } from "react";
import { playlistData } from "../constants";

const Playlist = () => {
    useEffect(() => {
        console.log('Component Playlist');
    }, [])
    return (
        <section className="grid sm:grid-rows-[150px_1fr]">
            <div className="sm:py-10 sm:bg-gradient-to-b from-[#e0cb419d] to-[#121212]">
                <h1 className="text-[38px] font-semibold mb-8 ml-8 uppercase">{playlistData.name}</h1>
            </div>
            <div className="flex flex-col relative z-[5] m-4 customScroll overflow-hidden overflow-y-scroll scroll-smooth">
                { playlistData.playlist.map((song, index) => (
                    <div className="flex flex-row items-center py-4 px-2 rounded-lg cursor-pointer hover:bg-gray-800">
                        <h4 className="text-[1.1rem] mr-4">{++index}</h4>
                        <img src={song.songThumb} alt={song.songId} className="w-[40px] h-[40px] object-cover overflow-hidden" />
                        
                        <div className="flex flex-col ml-4">
                            <h5 className="text-[13px] font-semibold cursor-pointer hover:text-dimWhite">{song.songTitle}</h5>
                            <h5 className="text-[13px] text-dimWhite cursor-pointer hover:text-white">{song.artist}</h5>
                        </div>
                        
                        <p className="text-dimWhite text-[13px] text-end w-full">{song.songLength}</p>
                    </div>
                )) }

                {/* <div className="absolute z-[-1] right-[-10rem] top-0 w-[40%] h-[70%] rounded-full blue_gradient" /> */}
            </div>
        </section>
    );
}

export default memo(Playlist);
