import React from "react";

import image from "../assets/images/applekeybord.png";
import mouseImg from "../assets/images/magicMouse1.png";

const Home = () => {
  return (
    <section
      id="home"
      role="main"
      className="flex items-center justify-center bg-white dark:bg-gray-900 transition-colors duration-300 pt-20 md:pt-28 pb-0"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* ✅ Responsive heading */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Frontend Developer
          </h1>

          {/* ✅ Responsive tech list */}
          <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
            {"{ JavaScript, React, React Native, Vue.js, MongoDB, Tailwind CSS }"}
          </p>

          {/* ✅ Responsive subheading */}
          <h3 className="mt-5 sm:mt-6 text-sm sm:text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200">
            Specializing in React.js I leverage cutting-edge technologies to bring web projects to life.
          </h3>

          {/* ✅ Buttons inline and responsive */}
          <div className="mt-6 flex flex-row justify-center gap-2 sm:gap-4">
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 text-sm sm:text-base rounded-full bg-blue-400 text-white font-medium shadow hover:bg-blue-500 hover:text-white focus:outline-none"
            >
              See my dev works
            </a>

            <a
              href="/uzam-cv.pdf"
              download="uzam_cv.pdf"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-2 text-sm sm:text-base rounded-full underline underline-offset-8 text-blue-400 dark:text-blue-400 bg-transparent hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-500 transition"
            >
              Download CV
            </a>
          </div>

          {/* ✅ Keyboard & mouse aligned horizontally, no bottom gap */}
          <div className="mt-8 flex items-center justify-center gap-6 mb-0 pb-0">
            <div className="w-56 sm:w-72 md:w-96 flex-shrink-0">
              <img
                src={image}
                alt="Mechanical keyboard"
                className="w-full h-auto object-contain mx-auto mb-0"
              />
            </div>

            <div className="hidden lg:block w-28 sm:w-32 flex-shrink-0">
              <img
                src={mouseImg}
                alt="Wireless mouse"
                className="w-full h-auto object-contain mb-0 mt-12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
