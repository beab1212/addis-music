import { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosPrivate } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { brandName } from "../constants";
import { profile } from "../assets";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const [dropDownToggle, setDropDownToggle] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const search = (e) => {
    if (e.key === "Enter" && query.length >= 2) {
      navigate(`/app/discover?query=${query}`);
    }
  };

  const logout = () => {
    axiosPrivate
      .delete("/auth/signout")
      .then((res) => {
        dispatch({ type: "LOGOUT_USER" });
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            message: res.data?.message + ", redirected to app dashboard...",
            type: "success",
            dismiss: 9000,
          },
        });
        navigate("/");
      })
      .catch((err) => {
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            message: err?.response?.data?.error || null,
            type: "warning",
            dismiss: 9000,
          },
        });
      });
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
    <section
      className={`flex flex-1 items-center justify-between px-4 max-xs:px-2 w-full`}
    >
      {/* Brand */}
      <div className="flex flex-row items-center mr-2">
        <img
          src={brandName.logo}
          alt={brandName.name}
          className="w-[40px] h-[40px] min-w-[30px] min-h-[30px] object-contain cursor-pointer"
          onClick={() => navigate("/app")}
        />
        <h1
          className={`text-[24px] font-semibold px-4 sm:block cursor-pointer ${
            user ? "hidden" : "block"
          }`}
          onClick={() => navigate("/app")}
        >
          {brandName.name}
        </h1>
      </div>
      {/* Search */}
      {user && (
        <div
          className="flex flex-row items-center relative"
          onFocus={() => setIsSearchFocus(true)}
          onBlur={() => setIsSearchFocus(false)}
        >
          <div className="bg-[#2a2a2a] px-4 py-2 rounded-full text-dimWhite hover:border-2 flex flex-row items-center">
            <i className="fa fa-search fa-1x px-2" />
            <input
              type="text"
              name="query"
              id=""
              className="outline-none bg-[#2a2a2a] max-xs:max-w-[150px]"
              placeholder="search"
              value={query}
              onChange={handleChange}
              onKeyUp={search}
            />
          </div>

          {/* Suggestion box */}
          <div
            className={`absolute top-12 w-full bg-gray-300 border rounded-xl px-1 py-4 z-10 ${
              suggestions.length > 0 && isSearchFocus ? "block" : "hidden"
            }`}
          >
            <ul className="text-gray-900">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion._id}
                  value={suggestion.title}
                  className="py-1 px-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                  onMouseDown={(e) => {
                    setQuery(e.target.textContent);
                  }}
                >
                  {suggestion.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* User setting ml-28 added for centering search field */}
      {user && (
        <div
          className="relative flex flex-row cursor-pointer border-4 hover:border-4 hover:border-blue-600 border-blue-400 rounded-full md:ml-28 ml-2"
          onBlur={() => setDropDownToggle(false)}
        >
          <img
            src={profile}
            alt="profile_image"
            className="w-[40px] h-[40px] min-w-[30px] min-h-[30px] object-cover rounded-full"
            onClick={() => setDropDownToggle((prev) => !prev)}
          />
          <div
            className={`absolute z-50 -mr-5 right-0 top-[4rem] w-[240px] max-xs:w-screen divide-y divide-stroke overflow-hidden rounded-lg bg-[#1a1a1a] shadow-md shadow-cyan-500/50 ${
              dropDownToggle ? "block" : "hidden"
            }`}
            onClick={() => setDropDownToggle(false)}
          >
            <div>
              <Link
                to="/app/profile"
                className="px-4 py-2.5 text-sm font-medium items-center hover:bg-white/5 block"
              >
                View profile
              </Link>
              <Link
                to="/app/song/upload"
                className="px-4 py-2.5 text-sm font-medium items-center hover:bg-white/5 block"
              >
                Upload Song
              </Link>
              <Link
                to="/app"
                className="px-4 py-2.5 text-sm font-medium items-center hover:bg-white/5 block"
              >
                History
              </Link>
              <Link
                to="/app"
                className="px-4 py-2.5 text-sm font-medium items-center hover:bg-white/5 block"
              >
                API
              </Link>
            </div>
            <div>
              <button
                className="flex w-full items-center justify-between px-4 py-2.5 text-sm font-medium text-dark hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                onClick={logout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(Header);
