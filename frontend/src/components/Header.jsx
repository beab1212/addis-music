import { useEffect, memo, useState } from "react";
import { axiosPrivate } from "../api/axios";
import { brandName } from "../constants";
import { profile } from "../assets";

const Header = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query) {
        axiosPrivate
          .get(`search/suggestion?query=${query}`)
          .then((res) => {
            setSuggestions(res.data?.suggestions);
            console.log("===========", res.data?.suggestions);
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
          className="w-[40px] h-[40px] object-contain"
        />
        <h1 className="text-[24px] font-semibold px-4 sm:block hidden">
          {brandName.name}
        </h1>
      </div>
      {/* Search */}
      <div className="flex flex-row items-center">
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
