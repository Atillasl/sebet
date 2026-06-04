import React, { useState } from 'react';
import { translations } from '../i18n';

const Header = ({ countCartItems, setPage, language = 'az', setLanguage }) => {
  const lang = translations[language] ? language : 'az';
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full">
      <nav className="bg-[#0a0a0a] border-b border-[#222] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* Logo */}
          <div
            onClick={() => setPage('home')}
            className="flex items-center cursor-pointer gap-3 group"
          >
            <div className="bg-[#F5A623] text-black w-11 h-11 flex items-center justify-center rounded-xl font-black text-xl">
              F
            </div>
            <div>
              <div className="text-base font-black text-white tracking-[0.15em] uppercase leading-none" style={{fontFamily: "'Oswald', sans-serif"}}>
                {translations[lang].brand.short}
              </div>
              <div className="text-[10px] uppercase text-[#888] tracking-[0.3em] mt-0.5">
                Cinema Gear
              </div>
            </div>
          </div>

          {/* Nav links — desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <button onClick={() => setPage('equipment')} className="text-[#888] hover:text-[#F5A623] transition-colors tracking-wide uppercase text-xs">
              {translations[lang].nav.equipment}
            </button>
            <button onClick={() => setPage('studio')} className="text-[#888] hover:text-[#F5A623] transition-colors tracking-wide uppercase text-xs">
              {translations[lang].nav.studio}
            </button>
            <button onClick={() => setPage('about')} className="text-[#888] hover:text-[#F5A623] transition-colors tracking-wide uppercase text-xs">
              {translations[lang].nav.about}
            </button>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="hidden sm:flex items-center gap-1 rounded-lg border border-[#333] bg-[#111] p-1">
              {(['az', 'en', 'ru']).map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`min-w-[36px] rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wider transition ${
                    language === code
                      ? 'bg-[#F5A623] text-black'
                      : 'text-[#666] hover:text-white'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            {/* Cart */}
            <button
              onClick={() => setPage('cart')}
              className="relative p-2.5 bg-[#f9f9f9] border border-[#eee] rounded-xl hover:border-[#F5A623] transition-all group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black group-hover:text-[#F5A623] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {countCartItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#F5A623] text-black text-[10px] font-black px-1.5 py-0.5 rounded-md min-w-[20px] text-center leading-none">
                  {countCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;