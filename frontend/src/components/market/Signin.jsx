import { useState } from "react";
import { brandName } from "../../constants";
import { styles } from "../../style";

const Signin = () => {
  const [isHide, setIsHide] = useState({
    password: true,
  });
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <section className="flex flex-1 flex-col text-gray-900">
      {/* sigup container */}
      <div className="flex flex-col sm:w-1/2 lg:w-1/3 w-full mx-auto py-6 borderr-4 rounded-3xl">
        <img
          src={brandName.logo}
          alt={brandName.name}
          className="w-14 object-contain mx-auto mb-6"
        />

        <h1 className="text-[28px] font-semibold text-center text-white leading-[40px]">
          Welcome to <br /> {brandName.name}
        </h1>

        {/* <p className={`${styles.paragraph} text-center px-8 mx-2`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
          totam, velit.
        </p> */}

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
              name="default-input"
              placeholder="Enter you email"
              disabled=""
              className="w-full rounded-lg border border-gray-2 bg-gray-2 py-3 pl-12 pr-5 text-dark-6 placeholder-dark-6 outline-none dark:border-dark-3 dark:bg-dark-3 dark:placeholder-dark-5"
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
            htmlFor="email"
            className="mb-2.5 block text-white text-base font-medium text-dark-5"
          >
            Password
          </label>
          <div className="relative">
            <input
              type={`${isHide.password ? "password" : "text"}`}
              name="default-input"
              placeholder="Enter you password"
              disabled=""
              className="w-full rounded-lg border border-gray-2 bg-gray-2 py-3 pl-12 pr-5 text-dark-6 placeholder-dark-6 outline-none dark:border-dark-3 dark:bg-dark-3 dark:placeholder-dark-5"
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

        <div className="mx-6 mt-2">
          <h4 className="text-dimWhite">
            Don't have an account{" "}
            <a href="" className="text-blue-600 font-semibold">
              SignUp?
            </a>
          </h4>
        </div>

        <button className="mx-auto w-1/3 mt-10 px-7 py-3 rounded-full border border-dark bg-dark text-base font-medium text-white hover:border-body-color hover:bg-gray-800 disabled:border-gray-3 disabled:bg-gray-3 disabled:text-dark-5 dark:border-dark-2 dark:bg-dark-2">
          Sign In
        </button>
      </div>
    </section>
  );
};

export default Signin;
