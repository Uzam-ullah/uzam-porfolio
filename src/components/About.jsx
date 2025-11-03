import React from "react";
import jsSvg from "../assets/images/iconSvg/jsSvg.svg"
import reactSvg from "../assets/images/iconSvg/reactSvg.svg"
import nextSvg from "../assets/images/iconSvg/nextSvg.svg"
import vueSvg from "../assets/images/iconSvg/vueSvg.svg"
import mongoSvg from "../assets/images/iconSvg/mongoDbSvg.svg"
import gitSvg from "../assets/images/iconSvg/gitSvg.svg"
import tailwindSvg from "../assets/images/iconSvg/tailwindSvg.svg"
import sassSvg from "../assets/images/iconSvg/sassSvg.svg"
import uzamProfile from "../assets/images/uzampng.png"

const FeatureCard = ({ icon, title, children }) => (
  <div className="flex flex-col items-start gap-3 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 shadow-sm">
    <div className="w-10 h-10 flex items-center justify-center rounded-md bg-white dark:bg-gray-700 shadow">
      {/* icon can be an <img/> or an inline svg */}
      {icon}
    </div>
    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h4>
    <p className="text-xs text-gray-600 dark:text-gray-300">{children}</p>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">Problem solver &lt;coder&gt;</h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300">Frontend Developer with over 1 year of experience.</p>
        </div>

        {/* content row - list + image */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* left - list */}
          <div>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="mt-1">
                  <span className="inline-block w-4 h-4 border border-gray-300 rounded-sm bg-white dark:bg-gray-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    <strong className="font-semibold">BS Computer Science.</strong>
                    <span className="font-normal"> Graduated from University of Gujrat as a Bachlor of Computer Science.</span>
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="mt-1">
                  <span className="inline-block w-4 h-4 border border-gray-300 rounded-sm bg-white dark:bg-gray-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    <strong className="font-semibold">Specializing in React & Next.js.</strong>
                    <span className="font-normal"> I am constantly working on learning new technologies &amp; following industry trends.</span>
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="mt-1">
                  <span className="inline-block w-4 h-4 border border-gray-300 rounded-sm bg-white dark:bg-gray-800" />
                </div>
                <div>
                  <p className="text-sm text-gray-900 dark:text-white">
                    <strong className="font-semibold">Love working in team.</strong>
                    <span className="font-normal"> I enjoy working in a team environment, but I can also work independently.</span>
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* right - image (on mobile this will appear below because grid is single column) */}
          <div className="flex justify-center md:justify-end">
            <div className="w-56 md:w-72 lg:w-80">
              <img src={uzamProfile} alt="Profile" className="w-full h-auto object-contain rounded-lg shadow-lg" />
            </div>
          </div>
        </div>

        {/* divider line */}
        <div className="mt-10">
          <hr className="border-t border-gray-300 dark:border-gray-700" />
        </div>

        {/* features grid - 8 items */}
        <div className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<img src={jsSvg} alt="jsicon" className="w-6 h-6" />}
              title="JavaScript"
            >
              Strong JS knowledge and advanced web development.
            </FeatureCard>

            <FeatureCard
              icon={<img src={reactSvg} alt="React" className="w-6 h-6" />}
              title="React"
            >
              Building fast and efficient React apps and websites.
            </FeatureCard>

            <FeatureCard
              icon={<img src={nextSvg} alt="Nexticon" className="w-6 h-6" />}
              title="Next.js"
            >
              Fast server-side rendering, dynamic routing &amp; less code.
            </FeatureCard>

            <FeatureCard
              icon={<img src={vueSvg} alt="Vueicon" className="w-6 h-6" />}
              title="Vue.js"
            >
              I build web interfaces & one page applications using Vue.
            </FeatureCard>

            <FeatureCard
              icon={<img src={mongoSvg} alt="mongoicon" className="w-6 h-6" />}
              title="MongoDB"
            >
              Using MongoDB for scalable databases on the backend.
            </FeatureCard>

            <FeatureCard
              icon={<img src={gitSvg} alt="GitSvg" className="w-6 h-6" />}
              title="Git"
            >
              DevOps tool for streamlined source code management.
            </FeatureCard>

            <FeatureCard
              icon={<img src={tailwindSvg} alt="Tailwind" className="w-6 h-6" />}
              title="TailwindCSS"
            >
              A utility-first widely used frontend CSS framework.
            </FeatureCard>

            <FeatureCard
              icon={<img src={sassSvg} alt="Sass" className="w-6 h-6" />}
              title="CSS & Sass"
            >
              I use Sass as my preferred CSS pre-processor.
            </FeatureCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
