import React, { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import Logopic from "../assets/images/namelogo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const initial = saved === "dark" ? "dark" : "light";
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    } catch (e) {}
  }, []);

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
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-transparent dark:border-gray-800 transition-colors">
      
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Text Group */}
        <a href="#home" className="flex items-center shrink-1" aria-label="Go to home">
          <div className="flex items-center -space-x-2">
            <img
              src={Logopic}
              alt="Uzam Ullah Khan"
              className="h-12 w-auto object-contain"
            />
            <div className="flex flex-col justify-center">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
                Uzam Ullah Khan
              </h1>
              <span className="text-sm text-gray-500 dark:text-gray-400 leading-none">
                Frontend Developer
              </span>
            </div>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          {menuItems.map((m) => (
            <a
              key={m.id}
              href={`#${m.id}`}
              onClick={() => handleSetActive(m.id)}
              className={`relative no-underline text-base font-medium visited:text-gray-800 dark:visited:text-gray-200 active:text-gray-800 dark:active:text-gray-200 focus:text-gray-800 dark:focus:text-gray-200 ${
                activeSection === m.id
                  ? "text-black dark:text-white"
                  : "text-black/70 dark:text-white/70 visited:text-black hover:text-black dark:hover:text-white"
              }`}
            >
              {m.label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-blue-400 transition-all duration-300 ${
                  activeSection === m.id ? "w-full" : "w-0"
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Right: Contact + Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-3 h-full">
          <a
            href="#contact"
            className="hidden md:inline-block border border-black dark:border-white text-black dark:text-white px-3 py-1 rounded-full hover:border-blue-400 hover:text-black dark:hover:border-blue-400 transition text-sm"
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
            <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full p-1 relative transition-colors duration-300 flex items-center">
              <div
                className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0"
                }`}
              />
              {theme === "dark" ? (
                <Moon className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-300" />
              ) : (
                <Sun className="absolute left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-yellow-500" />
              )}
            </div>
          </label>

          {/* Mobile menu button */}
          <button
            className="md:hidden border-none  text-blue-400 bg-transparent"
            onClick={() => setIsOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
                    ? "text-blue-400"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {m.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="text-blue-400 dark:text-blue-300 transition"
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