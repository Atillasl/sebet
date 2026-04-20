import React from 'react';
import { translations } from '../i18n';

const Footer = ({ setPage, language, setLanguage }) => {
  const currentYear = new Date().getFullYear();
  const t = translations[language];

  return (
    <footer className="bg-slate-950 text-slate-100 border-t border-slate-800 pt-16 pb-10 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-[1.3fr_0.9fr] items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setPage('home')}>
              <div className="bg-amber-400 text-slate-950 w-10 h-10 flex items-center justify-center rounded-2xl font-black text-lg">
                F
              </div>
              <div>
                <p className="text-lg font-black uppercase tracking-[0.2em]">{t.brand.name}</p>
                <p className="text-sm text-slate-300">{t.footer.about}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-slate-400">
              <p className="font-semibold text-slate-100">{t.footer.contact}</p>
              <a href="mailto:info@falkonrent.az" className="hover:text-amber-400 transition-colors">{t.footer.email}</a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-slate-100 font-bold mb-5 uppercase text-xs tracking-[0.3em]">{t.footer.links}</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><button onClick={() => setPage('home')} className="hover:text-amber-400 transition-colors">{t.nav.home}</button></li>
                <li><button onClick={() => setPage('equipment')} className="hover:text-amber-400 transition-colors">{t.nav.equipment}</button></li>
                <li><button onClick={() => setPage('studio')} className="hover:text-amber-400 transition-colors">{t.nav.studio}</button></li>
                <li><button onClick={() => setPage('about')} className="hover:text-amber-400 transition-colors">{t.nav.about}</button></li>
                <li><button onClick={() => setPage('cart')} className="hover:text-amber-400 transition-colors">{t.nav.cart}</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-100 font-bold mb-5 uppercase text-xs tracking-[0.3em]">{t.languageLabel}</h4>
              <div className="flex items-center gap-3">
                {(['az', 'en']).map((code) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={`rounded-full border px-3 py-2 text-sm font-semibold transition ${language === code ? 'border-amber-400 bg-amber-400 text-slate-950' : 'border-slate-700 text-slate-300 hover:border-amber-400 hover:text-white'}`}
                  >
                    {t.languageNames[code]}
                  </button>
                ))}
              </div>

              <div className="mt-8 space-y-3 text-sm text-slate-300">
                <p className="uppercase tracking-[0.3em] text-slate-500 text-xs">{t.footer.contact}</p>
                <div className="flex flex-wrap gap-3">
                  <span className="hover:text-amber-400 cursor-pointer transition-colors">{t.footer.social.instagram}</span>
                  <span className="hover:text-amber-400 cursor-pointer transition-colors">{t.footer.social.telegram}</span>
                  <span className="hover:text-amber-400 cursor-pointer transition-colors">{t.footer.social.whatsapp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-sm text-slate-500 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <p>{t.footer.legal.replace('{year}', currentYear)}</p>
          <p>{t.footer.about}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;