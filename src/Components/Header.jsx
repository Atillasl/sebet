import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Navigation } from './Navigation';
import { ThemeToggle } from './ThemeToggle';
import { RankBadge } from './RankBadge';
import { UserActions } from './UserActions';

const Header = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
           (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <header className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-900/50 sticky top-0 z-50 h-20 md:h-24 flex items-center transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center justify-between">
        
        {/* SOL: Logo (Brendin kimliyi) */}
        <div className="flex-shrink-0">
          <Logo />
        </div>
        
        {/* MƏRKƏZ: Naviqasiya (Fokus nöqtəsi) */}
        <div className="hidden lg:block flex-1 max-w-fit px-8">
          <Navigation />
        </div>
        
        {/* SAĞ: İstifadəçi İdarəetmə Paneli */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Alətlər qrupu */}
          <div className="flex items-center gap-2 md:gap-4 border-r border-gray-100 dark:border-gray-800 pr-4 md:pr-8">
            <div className="hover:scale-110 transition-transform">
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
            
            <div className="hidden sm:inline-flex">
              <RankBadge />
            </div>
          </div>
          
          {/* Profil və Çıxış */}
          <div className="hover:translate-x-1 transition-transform">
            <UserActions onLogout={onLogout} />
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;