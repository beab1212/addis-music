import { styles } from "../../style";
import { hero, setup } from "../../assets";
import Header from "../Header";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="overflow-y-scroll customScroll">
      <div className="">
        {/* Header section */}
        <div>
          <Header />
        </div>
        <div className={`${styles.boxWidth} mx-auto`}>
          {/* Hero section */}
          <div
            className={`flex md:flex-row flex-col lg:h-screen lg:max-h-[620px]`}
          >
            <div className="flex flex-1 flex-col xl:px-0 sm:px-16 px-6 sm:py-16 py-6">
              <h1
                className={`${styles.heading2} font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]`}
              >
                Feel the Beat with Addis Music.
              </h1>
              <p className={`${styles.paragraph}`}>
                Your soundtrack, your vibe." Stream seamlessly. Discover
                endlessly.
              </p>

              <a
                href="/signin"
                className="border text-center py-4 w-40 mt-4 font-semibold bg-yellow-600 hover:bg-yellow-700 rounded-lg"
              >
                Join Now
              </a>
            </div>
            <div className="flex flex-1 md:h-[500px] lg:h-full">
              <img src={hero} alt="" className="w-full object-contain" />
            </div>
          </div>

          {/* Some section */}
          <div
            className={`flex flex-col ${styles.paddingX} ${styles.paddingY} borderx`}
          >
            <h2 className={`${styles.heading2}`}>Why Choose Addis Music?</h2>
            <div className="flex md:flex-rowx flex-col mt-4 px-2">
              <div className="flex flex-row items-center borderx p-4 mb-6">
                <i className="fad fa-star" style={{ fontSize: "2rem" }} />
                <div className="flex flex-col px-4">
                  <h2 className="font-semibold text-[20px]">
                    Unlimited Streaming
                  </h2>
                  <p className={`${styles.paragraph}`}>
                    Access thousands of songs and exclusive playlists tailored
                    to your taste.
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-center borderx p-4 mb-6">
                <i className="fad fa-star" style={{ fontSize: "2rem" }} />
                <div className="flex flex-col px-4">
                  <h2 className="font-semibold text-[20px]">
                    Personalized Playlists
                  </h2>
                  <p className={`${styles.paragraph}`}>
                    Get custom recommendations based on your mood and
                    preferences.
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-center borderx p-4 mb-6">
                <i className="fad fa-star" style={{ fontSize: "2rem" }} />
                <div className="flex flex-col px-4">
                  <h2 className="font-semibold text-[20px]">
                    High-Quality Audio
                  </h2>
                  <p className={`${styles.paragraph}`}>
                    Enjoy music in pristine quality, just as the artists
                    intended.
                  </p>
                </div>
              </div>

              <div className="flex flex-row items-center borderx p-4 mb-6">
                <i className="fad fa-star" style={{ fontSize: "2rem" }} />
                <div className="flex flex-col px-4">
                  <h2 className="font-semibold text-[20px]">
                    Cross-Platform Sync
                  </h2>
                  <p className={`${styles.paragraph}`}>
                    Listen on any device, anytime, without missing a beat.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div
            className={`flex flex-col ${styles.paddingX} py-0 pb-10 borderx max-sm:px-4`}
          >
            <div className="flex md:flex-row flex-col">
              <div className="pt-10">
                <h2 className={`${styles.heading2}`}>How Addis Music Works?</h2>

                <h3 className="text-[25px] font-normal">Create an Account</h3>
                <p className={`${styles.paragraph}`}>
                  Sign up in seconds to access the full library.
                </p>

                <h3 className="text-[25px] font-normal mt-4">
                  Discover & Stream
                </h3>
                <p className={`${styles.paragraph}`}>
                  Explore new releases, trending songs, and unique genres.
                </p>

                <h3 className="text-[25px] font-normal mt-4">
                  Build Your Library
                </h3>
                <p className={`${styles.paragraph}`}>
                  Save, share, and create your personal playlist.
                </p>
              </div>

              <div className="flex-1">
                <img src={setup} alt="setup_avatar" className="mx-auto" />
              </div>
            </div>
          </div>

          <hr className={`mx-10 my-10`} />

          {/* Footer */}
          <div
            className={`flex flex-col ${styles.paddingX} py-0 pb-40`}
          >
            <div className="flex sm:flex-row flex-col">
              <div className="px-10 flex-1">
                <h3 className="flex font-semibold py-4">About Addis Music</h3>
                <p className={`${styles.paragraph}`}>
                  At Addis Music, we believe that music is more than just
                  sound—it’s emotion, passion, and connection. Our mission is to
                  bring the world’s best music to your fingertips and provide a
                  platform where artists and listeners can thrive.
                </p>
              </div>

              <div className="px-10 flex-1">
                <h3 className="flex font-semibold py-4">About Addis Music</h3>
                <p className={`${styles.paragraph}`}>
                  Addis music
                </p>
              </div>

              <div className="px-10 md:px-40x flex-1">
                <h3 className="flex font-semibold py-4">Contact</h3>
                <div className="flex flex-row text-white py-2">
                  <i
                    className="fab fa-brands fa-github px-4"
                    style={{ fontSize: "1.5rem" }}
                  />{" "}
                  <Link className="text-blue-600" to="https://github.com/beab1212">GitHub</Link>
                </div>

                <div className="flex flex-row py-2">
                  <i
                    className="fab fa-brands fa-github-alt text-white px-4"
                    style={{ fontSize: "1.5rem" }}
                  />{" "}
                  <Link className="text-blue-600" to="https://www.linkedin.com/in/beabDev">Linkedin</Link>
                </div>

                <div className="flex flex-row py-2">
                  <i
                    className="fab fa-brands fa-telegram text-white px-4"
                    style={{ fontSize: "1.5rem" }}
                  />{" "}
                  <Link className="text-blue-600" to="https://t.me/beabDev">Telegram</Link>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
