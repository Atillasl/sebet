import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { ThemeToggle } from './ThemeToggle';
import { RankBadge } from './RankBadge';
import { UserActions } from './UserActions';

const Header = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b-4 border-gray-100 dark:border-gray-800 sticky top-0 z-50 h-24 flex items-center transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full flex items-center justify-between">
        <Logo />
        <Navigation />
        
        <div className="flex items-center gap-4">
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          <RankBadge />
          <UserActions onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
};

export default Header;