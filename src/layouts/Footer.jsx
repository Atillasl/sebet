import { translations } from '../i18n';

const Footer = ({ setPage, language, setLanguage }) => {
  const currentYear = new Date().getFullYear();
  const t = translations[language];

  return (
    <footer className="bg-[#050505] border-t border-[#111] pt-16 pb-10 mt-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-12 md:grid-cols-[1.8fr_1fr_1fr_1fr]">
          
          {/* Brand col */}
          <div className="space-y-5">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
              <div className="bg-[#F5A623] text-black w-10 h-10 flex items-center justify-center rounded-xl font-black text-lg" style={{fontFamily: "'Oswald', sans-serif"}}>F</div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-white" style={{fontFamily: "'Oswald', sans-serif"}}>{t.brand.name}</p>
                <p className="text-xs text-[#555] tracking-wider">Cinema Gear Rental</p>
              </div>
            </div>
            <p className="text-sm text-[#666] leading-relaxed max-w-xs">{t.footer.about}</p>
            <div className="space-y-2 text-sm text-[#555]">
              <p className="flex items-center gap-2">
                <span className="text-[#F5A623]">@</span>
                <a href="mailto:info@falkonrent.az" className="hover:text-[#F5A623] transition-colors">{t.footer.email}</a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#F5A623]">#</span>
                <span>Bakı, Azərbaycan</span>
              </p>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-[0.3em]" style={{fontFamily: "'Oswald', sans-serif"}}>{t.footer.links}</h4>
            <ul className="space-y-3 text-sm text-[#666]">
              <li><button onClick={() => setPage('home')} className="hover:text-[#F5A623] transition-colors">{t.nav.home}</button></li>
              <li><button onClick={() => setPage('equipment')} className="hover:text-[#F5A623] transition-colors">{t.nav.equipment}</button></li>
              <li><button onClick={() => setPage('studio')} className="hover:text-[#F5A623] transition-colors">{t.nav.studio}</button></li>
              <li><button onClick={() => setPage('about')} className="hover:text-[#F5A623] transition-colors">{t.nav.about}</button></li>
              <li><button onClick={() => setPage('cart')} className="hover:text-[#F5A623] transition-colors">{t.nav.cart}</button></li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-[0.3em]" style={{fontFamily: "'Oswald', sans-serif"}}>{t.languageLabel}</h4>
            <div className="flex flex-wrap items-center gap-2">
              {(['az', 'en', 'ru']).map((code) => (
                <button
                  key={code}
                  onClick={() => setLanguage(code)}
                  className={`rounded-lg border px-4 py-2 text-sm font-bold uppercase tracking-wider transition ${
                    language === code
                      ? 'border-[#F5A623] bg-[#F5A623] text-black'
                      : 'border-[#333] text-[#666] hover:border-[#F5A623] hover:text-white'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-[0.3em]" style={{fontFamily: "'Oswald', sans-serif"}}>{t.footer.contact}</h4>
            <div className="flex gap-3">
              <a href="/" className="w-10 h-10 rounded-xl bg-[#111] border border-[#222] flex items-center justify-center text-[#888] hover:text-[#F5A623] hover:border-[#F5A623] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="/" className="w-10 h-10 rounded-xl bg-[#111] border border-[#222] flex items-center justify-center text-[#888] hover:text-[#F5A623] hover:border-[#F5A623] transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-13.5 8.38 8.38 0 0 1 3.8.9L21 3.5Z"></path></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#222] pt-6 text-xs text-[#444] flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <p>{t.footer.legal.replace('{year}', currentYear)}</p>
          <div className="flex gap-6">
            <button className="hover:text-[#F5A623] transition-colors">İstifadə şərtləri</button>
            <button className="hover:text-[#F5A623] transition-colors">Məxfilik siyasəti</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;