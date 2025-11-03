import project1 from "../assets/images/projects/project1.png";
import project2 from "../assets/images/projects/project2.jpg";
import project3 from "../assets/images/projects/project3.png";

const projects = [
  {
    id: 1,
    image: project1,
    tech: "React App • Javascript • CSS ",
    title: "Brainwave – AI Chat App",
    description:
      "A sleek, responsive AI chat platform built with React and Tailwind CSS, featuring modern design, smooth animations, and an intuitive user interface.",
  },
  {
    id: 2,
    image: project2,
    tech: "React App • Javascript • CSS ",
    title: "Ideal Trip – Tourism Platform",
    description:
      "A travel website connecting tourists with local homeowners and guides, built using React and Node.js for seamless booking and personalized trip experiences.",
  },
  {
    id: 3,
    image: project3,
    tech: "React App • Javascript • CSS ",
    title: "Portfolio Website",
    description:
      "A personal portfolio built with React to showcase projects, skills, and experience through a clean, responsive, and modern design.",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        {/* heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
            My <span className="text-blue-500">{'{dev}'}</span> projects
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-600 dark:text-gray-300">
            A selection of my recent frontend development projects showcasing my skills in React.js, and modern web technologies.
          </p>
        </div>

        {/* project cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex flex-col bg-gray-50 dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-full h-48 md:h-56 overflow-hidden rounded-t-xl">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {p.tech}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex-grow">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* see all button */}
        <div className="mt-10 text-center">
          <a
            href="#portfolio"
            className="text-blue-600 dark:text-blue-400 font-medium text-sm border-b border-blue-500 pb-0.5 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          >
            See all apps
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
