import { useState } from 'react';
import { translations } from '../i18n';

const Header = ({ countCartItems, setPage, language, setLanguage }) => {
  const [equipmentMenuOpen, setEquipmentMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex justify-between items-center">
          <div
            onClick={() => setPage('home')}
            className="flex items-center cursor-pointer gap-3"
          >
            <div className="bg-amber-400 text-slate-950 w-11 h-11 flex items-center justify-center rounded-2xl font-black text-xl shadow-sm">
              F
            </div>
            <div>
              <div className="text-2xl font-black text-gray-900 tracking-tight uppercase leading-none">
                {translations[language].brand.short}
              </div>
              <div className="text-xs uppercase text-gray-500 tracking-[0.2em] mt-0.5">
                Cinema Gear
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-600">
            <div
              className="relative"
              onMouseEnter={() => setEquipmentMenuOpen(true)}
              onMouseLeave={() => setEquipmentMenuOpen(false)}
            >
              <button
                onClick={() => setPage('equipment')}
                className="hover:text-amber-500 transition-colors"
              >
                {translations[language].nav.equipment}
              </button>
              <div
                className={`absolute left-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-3xl border border-slate-200 bg-white py-3 shadow-2xl transition-all duration-200 ${equipmentMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
              >
                <button
                  onClick={() => setPage('camera')}
                  className="w-full px-5 py-3 text-left text-sm text-gray-600 hover:bg-slate-50"
                >
                  {translations[language].nav.camera}
                </button>
                <button
                  onClick={() => setPage('grip')}
                  className="w-full px-5 py-3 text-left text-sm text-gray-600 hover:bg-slate-50"
                >
                  {translations[language].nav.grip}
                </button>
                <button
                  onClick={() => setPage('lighting')}
                  className="w-full px-5 py-3 text-left text-sm text-gray-600 hover:bg-slate-50"
                >
                  {translations[language].nav.lighting}
                </button>
                <button
                  onClick={() => setPage('studio')}
                  className="w-full px-5 py-3 text-left text-sm text-gray-600 hover:bg-slate-50"
                >
                  {translations[language].nav.studio}
                </button>
              </div>
            </div>
            <button onClick={() => setPage('studio')} className="hover:text-amber-500 transition-colors">{translations[language].nav.studio}</button>
            <button onClick={() => setPage('about')} className="hover:text-amber-500 transition-colors">{translations[language].nav.about}</button>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
              {(['az', 'en']).map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`min-w-[38px] rounded-full px-3 py-1 text-xs font-semibold transition ${language === code ? 'bg-slate-900 text-white' : 'text-gray-600 hover:text-slate-900'}`}
                >
                  {translations[language].languageNames[code]}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage('cart')}
              className="relative p-2 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-700 hover:text-blue-600 transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>

              {countCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg border-2 border-white min-w-[22px]">
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