import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { axiosPrivate } from "../../api/axios";
import { brandName } from "../../constants";
import { styles } from "../../style";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHide, setIsHide] = useState({
    password: true,
    rePassword: true,
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
    rePassword: "",
  });

  const handleChange = (e) => {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosPrivate
      .post("/auth/signup", form)
      .then((res) => {
        dispatch({
          type: "SET_USER",
          payload: {
            isAuthenticated: true,
            token: res.data?.sessionToken,
            user: res.data?.user,
          },
        });
        dispatch({
          type: "SHOW_ALERT",
          payload: {
            message: res.data?.message + ", redirected to app dashboard...",
            type: "success",
            dismiss: 9000,
          },
        });
        navigate("/app");
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

  return (
    <section className="flex flex-1 flex-col text-gray-900 overflow-y-scroll customScroll h-screen">
      {/* sigup container */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:w-1/2 lg:w-1/3 w-1/1 mx-auto py-6 borderr-4 rounded-3xl">
          <img
            src={brandName.logo}
            alt={brandName.name}
            className="w-14 object-contain mx-auto mb-6"
          />

          <h1 className="text-[28px] font-semibold text-center text-white leading-[40px]">
            Welcome to <br /> {brandName.name}
          </h1>

          <p className={`${styles.paragraph} text-center sm:px-8 mx-2 px-2`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
            totam, velit.
          </p>

          <div className="mx-6 mt-8">
            <label
              htmlFor="email"
              className="mb-2.5 block text-white text-base font-medium text-dark-5"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                name="email"
                placeholder="Enter you email"
                disabled=""
                className="w-full rounded-lg border border-gray-2 bg-gray-2 py-3 pl-12 pr-5 text-dark-6 placeholder-dark-6 outline-none dark:border-dark-3 dark:bg-dark-3 dark:placeholder-dark-5"
                value={form.email}
                onChange={handleChange}
              />
              <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center text-dark-5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.5 3H2.5C1.4375 3 0.53125 3.875 0.53125 4.96875V15.0937C0.53125 16.1562 1.40625 17.0625 2.5 17.0625H17.5C18.5625 17.0625 19.4687 16.1875 19.4687 15.0937V4.9375C19.4687 3.875 18.5625 3 17.5 3ZM17.5 4.40625C17.5312 4.40625 17.5625 4.40625 17.5937 4.40625L10 9.28125L2.40625 4.40625C2.4375 4.40625 2.46875 4.40625 2.5 4.40625H17.5ZM17.5 15.5938H2.5C2.1875 15.5938 1.9375 15.3438 1.9375 15.0312V5.78125L9.25 10.4687C9.46875 10.625 9.71875 10.6875 9.96875 10.6875C10.2187 10.6875 10.4687 10.625 10.6875 10.4687L18 5.78125V15.0625C18.0625 15.375 17.8125 15.5938 17.5 15.5938Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </div>
          </div>

          <div className="mx-6">
            <label
              htmlFor="password"
              className="mb-2.5 block text-white text-base font-medium text-dark-5"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={`${isHide.password ? "password" : "text"}`}
                name="password"
                placeholder="Enter you password"
                disabled=""
                className="w-full rounded-lg border border-gray-2 bg-gray-2 py-3 pl-12 pr-5 text-dark-6 placeholder-dark-6 outline-none dark:border-dark-3 dark:bg-dark-3 dark:placeholder-dark-5"
                value={form.password}
                onChange={handleChange}
              />
              <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center text-dark-5">
                <i
                  className="text-gray-700 fa fa-light fa-lock"
                  style={{ fontSize: "1.5rem" }}
                />
              </span>

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

          <div className="mx-6">
            <label
              htmlFor="rePassword"
              className="mb-2.5 block text-white text-base font-medium text-dark-5"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={`${isHide.rePassword ? "password" : "text"}`}
                name="rePassword"
                placeholder="Repeat you password"
                disabled=""
                className="w-full rounded-lg border border-gray-2 bg-gray-2 py-3 pl-12 pr-5 text-dark-6 placeholder-dark-6 outline-none dark:border-dark-3 dark:bg-dark-3 dark:placeholder-dark-5"
                value={form.rePassword}
                onChange={handleChange}
              />
              <span className="absolute left-0 top-0 flex h-full w-12 items-center justify-center text-dark-5">
                <i
                  className="text-gray-700 fa fa-light fa-lock"
                  style={{ fontSize: "1.5rem" }}
                />
              </span>

              <span className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-dark-5">
                <i
                  className={`text-gray-500 hover:text-gray-800 cursor-pointer fa ${
                    isHide.rePassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                  onClick={() => {
                    setIsHide((prev) => {
                      return { ...prev, rePassword: !prev.rePassword };
                    });
                  }}
                />
              </span>
            </div>
          </div>

          <div className="mx-6 mt-2">
            <h4 className="text-dimWhite">
              Already have an account{" "}
              <a href="/signin" className="text-blue-600 font-semibold">
                SignIn?
              </a>
            </h4>
          </div>

          <button className="mx-auto w-1/3 mt-10 px-7 py-3 rounded-full border border-dark bg-dark text-base font-medium text-white hover:border-body-color hover:bg-gray-800 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5 dark:border-dark-2 dark:bg-dark-2">
            SignUp
          </button>
        </div>
      </form>
    </section>
  );
};

export default Signup;
