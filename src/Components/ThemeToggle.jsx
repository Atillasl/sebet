import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = ({ darkMode, setDarkMode }) => (
  <button 
    onClick={() => setDarkMode(!darkMode)}
    className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-2xl text-gray-500 dark:text-yellow-400 hover:scale-110 transition-all border-b-4 border-gray-200 dark:border-gray-700 active:border-b-0"
  >
    {darkMode ? <Sun size={20} fill="currentColor" /> : <Moon size={20} fill="currentColor" />}
  </button>
);