import React from "react";

import image from "../assets/images/image.png";
import mouseImg from "../assets/images/Mouse1.png";
const Home = ({

}) => {
  return (
    <section id="home" role="main" className="min-h-screen flex items-start md:items-center py-20 md:py-28 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
            Frontend Developer
          </h1>

          <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300">
            {"{ JavaScript, React, Next.js, Vue.js, MongoDB, Tailwind CSS }"}
          </p>

          <h3 className="mt-6 text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200">
            Specializing in React.js I leverage cutting-edge technologies to bring web projects to life.
          </h3>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              See my dev works
            </a>

            <a
              href="/uzam-cv.pdf"
              download="uzam_cv.pdf"
              className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-blue-600 text-blue-600 dark:text-blue-300 bg-transparent hover:bg-blue-50 dark:hover:bg-gray-800 transition"
            >
              Download CV
            </a>
          </div>

          
          <div className="mt-12 flex items-center justify-center gap-8">

            <div className="w-64 sm:w-72 md:w-96 flex-shrink-0">
              <img
                src={image}
                alt="Mechanical keyboard"
                className="w-full h-auto object-contain mx-auto"
              />
            </div>

            <div className="hidden lg:block w-32 flex-shrink-0">
              <img
                src={mouseImg}
                alt="Wireless mouse"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
};

export default Home;
