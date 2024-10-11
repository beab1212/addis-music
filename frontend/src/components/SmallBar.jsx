import { useNavigate } from "react-router-dom";


const SmallBar = () => {
    const navigate = useNavigate();
    return (
        <section className={`flex flex-1 items-center justify-between px-4 overflow-y-hidden overflow-x-scroll smallCustomScroll pt-1`}>
            <h1 className="bg-[#2a2a2a] py-2 px-5 text-dimWhite hover:text-white cursor-pointer mr-4 rounded-full text-nowrap" onClick={() => navigate('/app/foryou')}>FORYOU</h1>

            <h1 className="bg-[#2a2a2a] py-2 px-5 text-dimWhite hover:text-white cursor-pointer mr-4 rounded-full text-nowrap" onClick={() => navigate('/app/discover')}>DISCOVER</h1>

            <h1 className="bg-[#2a2a2a] py-2 px-5 text-dimWhite hover:text-white cursor-pointer mr-4 rounded-full text-nowrap" onClick={() => navigate('/app/genre')}>GENRE</h1>

            <h1 className="bg-[#2a2a2a] py-2 px-5 text-dimWhite hover:text-white cursor-pointer mr-4 rounded-full text-nowrap" onClick={() => navigate('/app/discover')}>TOP CHARTS</h1>

            <h1 className="bg-[#2a2a2a] py-2 px-5 text-dimWhite hover:text-white cursor-pointer mr-4 rounded-full text-nowrap" onClick={() => navigate('/app/favorite')}>FAVORITES</h1>

            <h1 className="bg-[#2a2a2a] py-2 px-5 text-dimWhite hover:text-white cursor-pointer mr-4 rounded-full text-nowrap" onClick={() => navigate('/app/playlist')}>PLAYLIST</h1>

        </section>

    );
}

export default SmallBar;
