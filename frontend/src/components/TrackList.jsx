import { useEffect, memo } from "react";
import { playlistData } from "../constants";

const TrackList = () => {
    useEffect(() => {
        console.log('Component TrackList');
    }, [])
    return (
        <section className="">
            <div className="sm:py-10 sm:bg-gradient-to-b from-[#41e0d89d] to-[#121212]">
                <h1 className="text-[38px] font-semibold mb-8 ml-8 uppercase">Discover</h1>
            </div>

            <div className="flex flex-wrap gap-5 justify-between relative z-[5] m-4 customScroll overflow-hidden overflow-y-scroll scroll-smooth">
                { playlistData.playlist.map((song, index) => (
                    <div className="flex relative rounded-lg cursor-pointer overflow-hidden hover:bg-gray-800 md:w-[10rem] w-[6rem]">
                        <img src={song.songThumb} alt={song.songId} className="w-full object-cover" />
                        
                        <div className="absolute bottom-0 flex w-full flex-col bg-gradient-to-b from-[#2828281a] to-[#000000] pl-2">
                            <h5 className="text-[14px] font-semibold cursor-pointer hover:text-dimWhite">{song.songTitle}</h5>
                            <h5 className="text-[13px] text-dimWhite cursor-pointer hover:text-white">{song.artist}</h5>

                        </div>

                        <div className="absolute hover:flex flex top-0 items-center justify-center w-full h-full">
                            <div className="flex items-center justify-center rounded-full w-10 h-10 bg-[#1194c8] shadow-lg shadow-gray-900 pl-[0.3rem] overflow-hidden">
                                <i className="fa fa-play" style={{ fontSize: '1.4rem' }} />
                            </div>
                        </div>
                    </div>
                )) }

                { playlistData.playlist.map((song, index) => (
                    <div className="flex relative rounded-lg cursor-pointer overflow-hidden hover:bg-gray-800 md:w-[10rem] w-[6rem]">
                        <img src={song.songThumb} alt={song.songId} className="w-full object-cover" />
                        
                        <div className="absolute bottom-0 flex w-full flex-col bg-gradient-to-b from-[#2828281a] to-[#000000] pl-2">
                            <h5 className="text-[14px] font-semibold cursor-pointer hover:text-dimWhite">{song.songTitle}</h5>
                            <h5 className="text-[13px] text-dimWhite cursor-pointer hover:text-white">{song.artist}</h5>

                        </div>

                        <div className="absolute hover:flex flex top-0 items-center justify-center w-full h-full">
                            <div className="flex items-center justify-center rounded-full w-10 h-10 bg-[#1194c8] shadow-lg shadow-gray-900 pl-[0.3rem] overflow-hidden">
                                <i className="fa fa-play" style={{ fontSize: '1.4rem' }} />
                            </div>
                        </div>
                    </div>
                )) }
                { playlistData.playlist.map((song, index) => (
                    <div className="flex relative rounded-lg cursor-pointer overflow-hidden hover:bg-gray-800 md:w-[10rem] w-[6rem]">
                        <img src={song.songThumb} alt={song.songId} className="w-full object-cover" />
                        
                        <div className="absolute bottom-0 flex w-full flex-col bg-gradient-to-b from-[#2828281a] to-[#000000] pl-2">
                            <h5 className="text-[14px] font-semibold cursor-pointer hover:text-dimWhite">{song.songTitle}</h5>
                            <h5 className="text-[13px] text-dimWhite cursor-pointer hover:text-white">{song.artist}</h5>

                        </div>

                        <div className="absolute hover:flex flex top-0 items-center justify-center w-full h-full">
                            <div className="flex items-center justify-center rounded-full w-10 h-10 bg-[#1194c8] shadow-lg shadow-gray-900 pl-[0.3rem] overflow-hidden">
                                <i className="fa fa-play" style={{ fontSize: '1.4rem' }} />
                            </div>
                        </div>
                    </div>
                )) }
                { playlistData.playlist.map((song, index) => (
                    <div className="flex relative rounded-lg cursor-pointer overflow-hidden hover:bg-gray-800 md:w-[10rem] w-[6rem]">
                        <img src={song.songThumb} alt={song.songId} className="w-full object-cover" />
                        
                        <div className="absolute bottom-0 flex w-full flex-col bg-gradient-to-b from-[#2828281a] to-[#000000] pl-2">
                            <h5 className="text-[14px] font-semibold cursor-pointer hover:text-dimWhite">{song.songTitle}</h5>
                            <h5 className="text-[13px] text-dimWhite cursor-pointer hover:text-white">{song.artist}</h5>

                        </div>

                        <div className="absolute hover:flex flex top-0 items-center justify-center w-full h-full">
                            <div className="flex items-center justify-center rounded-full w-10 h-10 bg-[#1194c8] shadow-lg shadow-gray-900 pl-[0.3rem] overflow-hidden">
                                <i className="fa fa-play" style={{ fontSize: '1.4rem' }} />
                            </div>
                        </div>
                    </div>
                )) }
                {/* <div className="absolute z-[-1] right-[-10rem] top-0 w-[40%] h-[70%] rounded-full blue_gradient" /> */}
            </div>
        </section>
    );
}

export default memo(TrackList);
