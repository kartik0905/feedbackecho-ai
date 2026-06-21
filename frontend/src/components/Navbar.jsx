import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 p-4 transition-colors duration-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center flex-col md:flex-row gap-4 md:gap-0">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          FeedbackEcho AI
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <Link
            to="/dashboard"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Dashboard
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            About
          </Link>
          <Link
            to="/login"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Login
          </Link>

          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 ml-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </nav>
  );
}
