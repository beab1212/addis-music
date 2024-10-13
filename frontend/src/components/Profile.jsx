import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../api/axios";
import { profile } from "../assets";

const Profile = () => {
  const dispatch = useDispatch();
  const [isHide, setIsHide] = useState({
    password: true,
  });
  // profile change functionality is not implemented in both side
  const [data, setData] = useState({
    profile_image: "",
    username: "",
    first_name: "",
    last_name: "",
  });

  const handleSubmit = (e) => {
    axiosPrivate
      .post("/user/me", data)
      .then((res) => {
        console.log(res.data?.message);
        dispatch({
          type: "UPDATE_USER",
          payload: {
            user: res.data?.user,
          },
        });
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            message: res.data?.message || null,
            type: "success",
            dismiss: 9000,
          },
        });
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

  const handleChange = (e) => {
    if (e.target.name === "profile_image") {
      setData((prev) => {
        return { ...prev, [e.target.name]: e.target.files[0] };
      });
    } else {
      setData((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  useEffect(() => {
    axiosPrivate
      .get("/user/me")
      .then((res) => {
        setData(res.data?.user);
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
  }, []);

  return (
    <section className="flex flex-col">
      <div className="sm:py-10">
        <h1 className="text-[38px] font-semibold mb-8 ml-8 uppercase text-nowrap">
          Profile
        </h1>
        <hr className="mx-4" />
      </div>

      <div className="flex flex-col mt-4">
        <div className="relative mx-auto">
          <img
            src={profile}
            alt="user_profile_image"
            className="w-48 h-48 object-cover rounded-full"
          />
          <div className="absolute right-[0.15rem] bottom-5 p-1 bg-[#121212] border-4 rounded-full cursor-pointer hover:text-blue-700">
            {/* <input type="file" name="profile_image" className="hidden" /> */}
            <i className="fad fa-edit pl-1" style={{ fontSize: "1.1rem" }} />
          </div>
        </div>

        <input
          type="text"
          name="username"
          placeholder="@Username"
          className="mx-auto mt-4 bg-transparent outline-none py-2 text-center"
          value={data.username}
          onChange={handleChange}
        />
      </div>

      <div className="max-sm:mx-2 mx-auto mb-20">
        <div className="flex flex-row gap-4">
          <div className="">
            <label
              htmlFor="title"
              className="mb-2.5 block text-base font-medium text-dark text-white"
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="w-full rounded-lg text-gray-800 border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary"
              value={data.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="">
            <label
              htmlFor="title"
              className="mb-2.5 block text-base font-medium text-dark text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="w-full rounded-lg text-gray-800 border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary"
              value={data.last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="">
          <label
            htmlFor="title"
            className="mb-2.5 block text-base font-medium text-dark text-white"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder={data.email}
            className="w-full rounded-lg text-gray-800 border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary"
            disabled
          />
        </div>

        <div className="hidden">
          <label
            htmlFor="title"
            className="mb-2.5 block text-base font-medium text-dark text-white"
          >
            password
          </label>
          <div className="relative">
            <input
              type={`${isHide.password ? "_" : "text"}`}
              name="password"
              placeholder="Enter you password"
              disabled=""
              className="w-full rounded-lg text-gray-800 pr-10 border border-stroke px-5 py-3 text-dark placeholder-dark-6 outline-none focus:border-primary"
            />

            <span className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-dark-5">
              <i
                className={`text-gray-500 hover:text-gray-800 cursor-pointer fa ${
                  isHide.password ? "fa-eye-slash" : "fa-eye"
                }`}
                onClick={() => {
                  setIsHide((prev) => {
                    return { ...prev, password: !prev.password };
                  });
                }}
              />
            </span>
          </div>
        </div>

        <div className="flex justify-end mx-4 my-5">
          <button
            className="items-center rounded-full border-2 border-blue-500 bg- px-7 py-3 text-center text-base font-medium text-white hover:border-[#0BB489] hover:bg-[#016485b4] disabled:hover:bg-transparent"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
      <p className="mb-8 text-center text-red-500">
        Development Note: profile image and password change functionality is not
        implemented in both side
      </p>
    </section>
  );
};

export default Profile;
