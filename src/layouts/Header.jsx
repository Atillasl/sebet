import React from 'react';

const Header = ({ countCartItems, setPage }) => {
  return (
    <header className="w-full">
      {/* 1. Top Bar - Elan Hissəsi */}
      <div className="bg-gray-900 text-white py-2 text-center text-xs sm:text-sm font-medium tracking-wide">
        🎉 2000 ₼ üzəri alış-verişdə <span className="text-yellow-400 font-bold">PULSUZ ÇATDIRILMA!</span>
      </div>

      {/* 2. Əsas Naviqasiya (Navbar) */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex justify-between items-center">
          
          {/* Loqo */}
          <div 
            onClick={() => setPage('home')}
            className="flex items-center cursor-pointer group"
          >
            <div className="bg-blue-600 text-white w-10 h-10 flex items-center justify-center rounded-xl font-black text-xl mr-2 group-hover:rotate-6 transition-transform">
              E
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tighter uppercase">
              Store<span className="text-blue-600">.</span>
            </span>
          </div>

          {/* Orta Menyu (Opsional - Kateqoriyalara sürətli keçid) */}
          <div className="hidden md:flex items-center space-x-8 font-semibold text-gray-600">
            <button onClick={() => setPage('home')} className="hover:text-blue-600 transition-colors">Ana Səhifə</button>
            <button className="hover:text-blue-600 transition-colors">Yeni Gələnlər</button>
            <button className="hover:text-blue-600 transition-colors">Endirimlər</button>
          </div>

          {/* Sağ tərəf: Axtarış və Səbət */}
          <div className="flex items-center space-x-5">
            {/* Axtarış İkonu (Dekorativ) */}
            <button className="text-gray-400 hover:text-gray-900 transition-colors hidden sm:block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Səbət Düyməsi */}
            <button 
              onClick={() => setPage('cart')}
              className="relative group p-2 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-7 w-7 text-gray-700 group-hover:text-blue-600 transition-colors" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>

              {/* Səbət Sayğacı */}
              {countCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-black px-2 py-0.5 rounded-lg border-2 border-white min-w-[22px] animate-bounce">
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