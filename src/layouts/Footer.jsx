import React from 'react';

const Footer = ({ setPage }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Brend Məlumatı */}
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
              <div className="bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-lg font-black text-lg mr-2">
                E
              </div>
              <span className="text-xl font-black text-gray-900 uppercase">Store<span className="text-blue-600">.</span></span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Azərbaycanın ən sürətli və güvənli alış-veriş platforması. Keyfiyyətli məhsullar və 24/7 dəstək.
            </p>
          </div>

          {/* 2. Sürətli Keçidlər */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 uppercase text-xs tracking-widest">Mağaza</h4>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li><button onClick={() => setPage('home')} className="hover:text-blue-600 transition-colors">Ana Səhifə</button></li>
              <li><button className="hover:text-blue-600 transition-colors">Bütün Məhsullar</button></li>
              <li><button className="hover:text-blue-600 transition-colors">Endirimlər</button></li>
              <li><button className="hover:text-blue-600 transition-colors">Yeni Kolleksiya</button></li>
            </ul>
          </div>

          {/* 3. Dəstək */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 uppercase text-xs tracking-widest">Dəstək</h4>
            <ul className="space-y-4 text-sm text-gray-600 font-medium">
              <li className="hover:text-blue-600 cursor-pointer">Tez-tez verilən suallar</li>
              <li className="hover:text-blue-600 cursor-pointer">Çatdırılma və Qaytarılma</li>
              <li className="hover:text-blue-600 cursor-pointer">Məxfilik Siyasəti</li>
              <li className="hover:text-blue-600 cursor-pointer">Əlaqə</li>
            </ul>
          </div>

          {/* 4. Abunəlik */}
          <div>
            <h4 className="text-gray-900 font-bold mb-6 uppercase text-xs tracking-widest">Yeniliklərdən xəbərdar ol</h4>
            <div className="flex">
              <input 
                type="email" 
                placeholder="E-poçtunuz" 
                className="bg-gray-50 border border-gray-200 rounded-l-xl px-4 py-2 w-full focus:outline-none focus:border-blue-500 text-sm"
              />
              <button className="bg-gray-900 text-white px-4 py-2 rounded-r-xl hover:bg-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Alt Qat - Müəllif Hüquqları */}
        <div className="pt-8 border-t border-gray-50 flex flex-col md:row-reverse md:flex-row justify-between items-center gap-4">
          <div className="flex space-x-6">
            <span className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors text-sm">Instagram</span>
            <span className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors text-sm">Telegram</span>
            <span className="text-gray-400 hover:text-blue-600 cursor-pointer transition-colors text-sm">WhatsApp</span>
          </div>
          <p className="text-gray-400 text-xs">
            © {currentYear} E-Store Project. Bütün hüquqlar qorunur. Məmmədov V. tərəfindən yaradıldı.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;