import React, { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import Logopic from "../assets/images/namelogo.png";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({ neutral = false, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  // Start with no active item in neutral mode to avoid underline flicker
  const [activeSection, setActiveSection] = useState(neutral ? "" : "home");
  const navigate = useNavigate();
  const location = useLocation();

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
      // Skip when BlogDetailPage modal is open or header is neutral (in modal)
      if (document.body.style.position === "fixed" || neutral) return;

      const sections = ["home", "about", "portfolio", "blog", "contact"];
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
  }, [neutral]);

  // Ensure no item appears active in neutral mode
  useEffect(() => {
    if (neutral) setActiveSection("");
  }, [neutral]);

  // Sync activeSection with current pathname (non-neutral only)
  useEffect(() => {
    if (neutral) return;
    const map = {
      "/": "home",
      "/home": "home",
      "/about": "about",
      "/portfolio": "portfolio",
      "/blog": "blog",
      "/contact": "contact",
    };
    const id = map[location.pathname];
    if (id && id !== activeSection) setActiveSection(id);
  }, [location.pathname, neutral]);

  const handleSetActive = (id) => {
    setIsOpen(false);
    const targetPath = id === "home" ? "/" : `/${id}`;

    if (neutral) {
      // Delegate to parent (BlogDetailPage) so it can close modal then navigate + scroll
      if (typeof onNavigate === "function") onNavigate(targetPath, id);
      return;
    }

    setActiveSection(id);
    navigate(targetPath);
    // Immediate smooth scroll (in case route already rendered)
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
        <button
          onClick={() => handleSetActive("home")}
          className="flex items-center shrink-1 focus:outline-none active:outline-none bg-transparent border-none"
          aria-label="Go to home"
        >
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
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          {menuItems.map((m) => {
            const isActive = !neutral && activeSection === m.id;
            return (
              <button
                key={m.id}
                onClick={() => handleSetActive(m.id)}
                className={`relative no-underline text-base font-medium bg-transparent border-none cursor-pointer focus:outline-none active:outline-none ${
                  isActive
                    ? "text-black dark:text-white"
                    : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white"
                }`}
              >
                {m.label}
                {!neutral && (
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-blue-400 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Contact + Theme Toggle + Mobile Menu */}
        <div className="flex items-center gap-3 h-full">
          <button
            onClick={() => handleSetActive("contact")}
            className="hidden md:inline-block border border-black dark:border-white text-black dark:text-white px-3 py-1 rounded-full hover:border-blue-400 hover:text-black dark:hover:border-blue-400 transition text-sm focus:outline-none active:outline-none bg-transparent"
          >
            Contact me
          </button>

          <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer focus:outline-none active:outline-none bg-transparent">
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
            className="md:hidden border-none text-blue-400 bg-transparent focus:outline-none active:outline-none"
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
            {menuItems.map((m) => {
              const isActive = !neutral && activeSection === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => handleSetActive(m.id)}
                  className={`transition text-center bg-transparent border-none focus:outline-none active:outline-none ${
                    isActive ? "text-blue-400" : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
            <button
              onClick={() => handleSetActive("contact")}
              className="text-blue-400 dark:text-blue-300 transition bg-transparent border-none focus:outline-none active:outline-none text-center"
            >
              Contact me
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
