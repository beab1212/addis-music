import { useEffect, memo, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { useNavigate } from "react-router-dom";
import { brandName } from "../constants";
import { profile } from "../assets";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const search = () => {
    console.log(query, '=============');
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        axiosPrivate
          .get(`search/suggestion?query=${query}`)
          .then((res) => {
            setSuggestions(res.data?.suggestions);
          })
          .catch((err) => {
            setSuggestions([]);
          });
      } else {
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn); // Cleanup timeout on component unmount or query change
  }, [query]);

  useEffect(() => {
    console.log("Component Header");
  }, []);
  return (
    <section className={`flex flex-1 items-center justify-between px-4`}>
      {/* Brand */}
      <div className="flex flex-row items-center">
        <img
          src={brandName.logo}
          alt={brandName.name}
          className="w-[40px] h-[40px] object-contain cursor-pointer"
          onClick={() => navigate('/app')}
        />
        <h1 className="text-[24px] font-semibold px-4 sm:block hidden cursor-pointer" onClick={() => navigate('/app')}>
          {brandName.name}
        </h1>
      </div>
      {/* Search */}
      <div className="flex flex-row items-center relative box-border" onFocus={() => setIsSearchFocus(true)} onBlur={() => setIsSearchFocus(false)} >
        <div className="bg-[#2a2a2a] px-4 py-2 rounded-full text-dimWhite hover:border-2 flex flex-row items-center">
          <i className="fa fa-search fa-1x px-2" />
          <input
            type="text"
            name="query"
            id=""
            className="outline-none bg-[#2a2a2a]"
            placeholder="search"
            value={query}
            onChange={handleChange}
          />
        </div>

        <div className={`absolute top-12 w-full bg-gray-300 border rounded-xl px-1 py-4 z-10 ${ (suggestions.length > 0 && isSearchFocus) ? 'block' : 'hidden'}`}>
          <ul className="text-gray-900">
            {suggestions.map((suggestion) => (
              <li key={suggestion._id} value={suggestion.key} className="py-1 px-2 hover:bg-gray-100 cursor-pointer rounded-lg" onMouseDown={(e) => {
                setQuery(e.target.textContent);
              }}>{suggestion.key}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* User setting ml-28 added for centering search field */}
      <div className="flex flex-row cursor-pointer border-4 hover:border-4 hover:border-blue-600 border-blue-400 rounded-full md:ml-28 ml-2">
        <img
          src={profile}
          alt="profile_image"
          className="w-[40px] h-[40px] object-contain rounded-full"
        />
      </div>
    </section>
  );
};

export default memo(Header);
