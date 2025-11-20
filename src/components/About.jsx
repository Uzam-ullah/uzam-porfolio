import React from "react";
import jsSvg from "../assets/images/iconSvg/jsSvg.svg";
import reactSvg from "../assets/images/iconSvg/reactSvg.svg";
import reactnativeSvg from "../assets/images/iconSvg/reactnativeSvg.svg";
import vueSvg from "../assets/images/iconSvg/vueSvg.svg";
import mongoSvg1 from "../assets/images/iconSvg/mongoDbSVG1.svg";
import gitSvg from "../assets/images/iconSvg/gitSvg.svg";
import tailwindSvg from "../assets/images/iconSvg/tailwindSvg.svg";
import sassSvg from "../assets/images/iconSvg/sassSvg.svg";
import uzamProfile from "../assets/images/uzampicc.png";

/**
 * FeatureCard
 * - image on top, title then description (left-aligned under title)
 */
const FeatureCard = ({ imgSrc, alt, title, description }) => (
  <div className="flex flex-col items-start gap-3 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-sm">
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-gray-700 shadow">
      <img src={imgSrc} alt={alt} className="w-6 h-6 object-contain" />
    </div>

    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
      {title}
    </h4>

    {/* description now truly left-aligned */}
    <p className="text-xs text-gray-600 dark:text-gray-300 text-left">
      {description}
    </p>
  </div>
);


const About = () => {
  const features = [
    {
      id: "js",
      img: jsSvg,
      title: "JavaScript",
      description: "Strong JS knowledge and advanced web development.",
    },
    {
      id: "react",
      img: reactSvg,
      title: "React",
      description: "Building fast and efficient React apps and websites.",
    },
    {
      id: "react-native",
      img: reactnativeSvg,
      title: "React Native",
      description: "Build cross-platform mobile apps using JavaScript and React.",
    },
    {
      id: "vue",
      img: vueSvg,
      title: "Vue.js",
      description: "I build web interfaces & single page applications using Vue.",
    },
    {
      id: "mongo",
      img: mongoSvg1,
      title: "MongoDB",
      description: "Using MongoDB for scalable databases on the backend.",
    },
    {
      id: "git",
      img: gitSvg,
      title: "Git",
      description: "DevOps tool for streamlined source code management.",
    },
    {
      id: "tailwind",
      img: tailwindSvg,
      title: "TailwindCSS",
      description: "A utility-first widely used frontend CSS framework.",
    },
    {
      id: "sass",
      img: sassSvg,
      title: "CSS & Sass",
      description: "I use Sass as my preferred CSS pre-processor.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        {/* header */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            Problem solver &lt;coder&gt;
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300">
            Frontend Developer with upto 1 year of experience.
          </p>
        </div>

        {/* content row - list + image */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* left - list */}
          <div>
  <ul className="space-y-6">
    {/* Item 1 */}
    <li className="flex flex-col">
      <span className="inline-block w-4 h-4 border border-gray-400 rounded-sm mb-2"></span>
      <p className="text-sm text-gray-900 dark:text-white text-left leading-relaxed">
        <strong className="font-semibold">BS Computer Science.</strong>{" "}
        <span className="font-normal">
           Graduated from University of Gujrat as a Bachelor of Computer Science.
        </span>
      </p>
    </li>

    {/* Item 2 */}
    <li className="flex flex-col">
      <span className="inline-block w-4 h-4 border border-gray-400 rounded-sm mb-2"></span>
      <p className="text-sm text-gray-900 dark:text-white text-left leading-relaxed">
        <strong className="font-semibold">Specializing in React &amp; React Native.</strong>{" "}
        <span className="font-normal">
          I am constantly working on learning new technologies &amp; following industry trends.
        </span>
      </p>
    </li>

    {/* Item 3 */}
    <li className="flex flex-col">
      <span className="inline-block w-4 h-4 border border-gray-400 rounded-sm mb-2"></span>
      <p className="text-sm text-gray-900 dark:text-white text-left leading-relaxed">
        <strong className="font-semibold">Love working in team.</strong>{" "}
        <span className="font-normal">
          I enjoy working in a team environment, but I can also work independently.
        </span>
      </p>
    </li>
  </ul>
</div>


          {/* right - profile image */}
          <div className="flex justify-center md:justify-end">
            <div className="w-56 md:w-72 lg:w-80">
              <img
                src={uzamProfile}
                alt="Profile"
                className="w-full h-auto object-contain rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* divider line */}
        <div className="mt-10">
          <hr className="border-t border-gray-300 dark:border-gray-700" />
        </div>

        {/* features grid - map from features array */}
        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <FeatureCard
                key={f.id}
                imgSrc={f.img}
                alt={`${f.title} icon`}
                title={f.title}
                description={f.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

