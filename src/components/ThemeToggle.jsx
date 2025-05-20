// src/components/ThemeToggle.jsx
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Appliquer le thème en fonction du localStorage au montage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center w-16 h-8 bg-neutral-300 dark:bg-zinc-700 rounded-full px-1 transition-colors shadow-inner"
      aria-label="Changer le thème"
    >
      <div
        className={`absolute top-0 left-0 h-full w-1/2 bg-white dark:bg-red-600 rounded-full shadow-md transform transition-transform duration-300 ${
          darkMode ? 'translate-x-full' : ''
        }`}
      />
      <Sun className="z-10 w-4 h-4 text-yellow-500 ml-1" />
      <Moon className="z-10 w-4 h-4 text-gray-900 ml-auto mr-1" />
    </button>
  );
  
};

export default ThemeToggle;
