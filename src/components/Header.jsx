import React, { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react"; // npm i lucide-react

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("home"); // ✅ NEW

  // Initialize theme
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const initial = saved === "dark" ? "dark" : "light";
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    } catch (e) {}
  }, []);

  // ✅ Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "portfolio", "blog"];
      const scrollPos = window.scrollY + 200;

      for (let id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Click handler for setting active manually
  const handleSetActive = (id) => {
    setActiveSection(id);
    setIsOpen(false);
  };

  const handleToggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const menuItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About me" },
    { id: "portfolio", label: "Portfolio" },
    { id: "blog", label: "Blog" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-transparent dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* left - logo */}
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white cursor-pointer">
            Uzam Ullah khan
          </h1>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Frontend Developer
          </span>
        </div>

        {/* center - menu */}
        <nav className="hidden md:flex gap-8 items-center">
          {menuItems.map((m) => (
            <a
              key={m.id}
              href={`#${m.id}`}
              onClick={() => handleSetActive(m.id)} // ✅ make it stick on click
              className={`relative text-lg font-medium transition-colors duration-200 group ${
                activeSection === m.id
                  ? "text-black dark:text-white"
                  : "text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white"
              }`}
            >
              {m.label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all duration-300 ${
                  activeSection === m.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* right - contact + theme + mobile button */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden md:inline-block border border-blue-500 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 transition"
          >
            Contact me
          </a>

          <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
            <input
              id="theme-toggle"
              type="checkbox"
              className="sr-only"
              checked={theme === "dark"}
              onChange={handleToggle}
            />
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full p-1 relative transition-colors duration-300">
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0"
                }`}
              />
              {theme === "dark" ? (
                <Moon className="absolute right-1 top-1.5 w-3.5 h-3.5 text-gray-200" />
              ) : (
                <Sun className="absolute left-1 top-1.5 w-3.5 h-3.5 text-yellow-400" />
              )}
            </div>
          </label>

            <button
                   className="bg-white/30 dark:bg-gray-800/30 md:hidden"
                   onClick={() => setIsOpen((s) => !s)}
                    aria-label="Toggle menu"
                                      >
                  {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
        </div>
      </div>

      {/* mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900">
          <nav className="flex flex-col px-6 py-4 gap-3">
            {menuItems.map((m) => (
              <a
                key={m.id}
                href={`#${m.id}`}
                onClick={() => handleSetActive(m.id)}
                className={`transition ${
                  activeSection === m.id
                    ? "text-blue-500"
                    : "text-gray-800 dark:text-gray-200 hover:text-blue-500"
                }`}
              >
                {m.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-blue-400 dark:text-blue-300 hover:text-blue-800 transition"
            >
              Contact me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
