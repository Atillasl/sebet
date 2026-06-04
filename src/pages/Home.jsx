import { translations, sectionImages } from '../i18n';

const CATEGORY_ICONS = {
  camera: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  lighting: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m1.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
  grip: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  ),
  studio: (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
};

const Home = ({ setPage, language, onCategoryClick }) => {
  // Fallback to 'az' if language translation is missing
  const t = translations[language] || translations['az'];
  const sectionKeys = ['camera', 'lighting', 'grip', 'studio'];
  const sections = sectionKeys.map((key) => ({
    key,
    title: t.categories[key].title,
    subtitle: t.categories[key].subtitle,
    image: sectionImages[key],
  }));

  return (
    <div className="space-y-0">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen overflow-hidden bg-[#0a0a0a] text-white w-[100vw] left-1/2 right-1/2 -translate-x-1/2 max-w-none">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-50"
          src="https://cdn.pixabay.com/video/2019/06/17/24497-344562750_large.mp4"
          autoPlay muted loop playsInline
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        
        <div className="relative z-10 flex min-h-screen flex-col justify-center px-8 sm:px-16 lg:px-24 py-32 max-w-4xl">
          <p className="text-[#F5A623] text-xs uppercase tracking-[0.4em] font-bold mb-6">Falkon Rent</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] text-white mb-6" style={{fontFamily: "'Oswald', sans-serif"}}>
            {t.hero.headline.split(t.hero.accentWord || 'kirayəsi').map((part, i, arr) =>
              i < arr.length - 1
                ? <span key={i}>{part}<span className="text-[#F5A623]">{t.hero.accentWord || 'kirayəsi'}</span></span>
                : <span key={i}>{part}</span>
            )}
          </h1>
          <p className="text-[#aaa] text-base sm:text-lg leading-relaxed max-w-xl mb-10">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setPage('equipment')}
              className="inline-flex items-center gap-2 bg-[#F5A623] hover:bg-[#d4891a] text-black font-bold px-7 py-3.5 rounded-lg text-sm uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em'}}
            >
              Avadanlıqlara bax
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => setPage('about')}
              className="inline-flex items-center gap-2 bg-transparent border border-[#444] hover:border-white text-white font-semibold px-7 py-3.5 rounded-lg text-sm uppercase tracking-wider transition-all"
              style={{fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em'}}
            >
              <span className="w-7 h-7 rounded-full border border-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="white" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </span>
              Necə işləyirik?
            </button>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="bg-white py-24 px-6 w-[100vw] left-1/2 -translate-x-1/2 relative max-w-none rounded-t-[3rem] -mt-16 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#F5A623] text-xs uppercase tracking-[0.4em] font-bold mb-4">Falkon-u kəşf edin</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0a0a0a] mb-4" style={{fontFamily: "'Oswald', sans-serif"}}>
              {t.exploreHeadline}
            </h2>
            <p className="text-[#666] text-sm max-w-lg mx-auto leading-relaxed">{t.exploreSubtitle}</p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => onCategoryClick(section.key)}
                className="group overflow-hidden rounded-2xl bg-white border border-[#e5e5e5] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-[#F5A623] text-left"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105 brightness-90"
                  />
                  <div className="absolute bottom-4 left-4 w-9 h-9 rounded-lg bg-[#F5A623] flex items-center justify-center text-black">
                    {CATEGORY_ICONS[section.key]}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-[#0a0a0a] mb-1" style={{fontFamily: "'Oswald', sans-serif"}}>{section.title}</h3>
                  <p className="text-sm text-[#888] mb-4">{section.subtitle}</p>
                  <span className="text-[#F5A623] text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    Məhsullara bax
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section className="relative w-[100vw] left-1/2 -translate-x-1/2 max-w-none overflow-hidden bg-[#0a0a0a] py-24">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[#F5A623] text-xs uppercase tracking-[0.4em] font-bold mb-4">{t.projects.label}</p>
              <h2 className="text-4xl sm:text-5xl font-black text-white" style={{fontFamily: "'Oswald', sans-serif"}}>{t.projects.title}</h2>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-[#666] text-sm max-w-xs">{t.projects.subtitle}</p>
              <button className="flex-shrink-0 inline-flex items-center gap-2 border border-[#333] hover:border-[#F5A623] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-lg transition-all whitespace-nowrap" style={{fontFamily: "'Oswald', sans-serif"}}>
                Bütün layihələr
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Row 1 */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="flex w-[200%] gap-4 px-4 py-2 animate-marquee">
              {[
                'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2033981/pexels-photo-2033981.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/789349/pexels-photo-789349.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=800',
              ].concat([
                'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/2033981/pexels-photo-2033981.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/789349/pexels-photo-789349.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=800',
              ]).map((src, i) => (
                <div key={i} className="min-w-[20rem] flex-shrink-0 overflow-hidden rounded-2xl border border-[#222] bg-[#111]">
                  <img src={src} alt="project" className="h-56 w-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
          {/* Row 2 */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="flex w-[200%] gap-4 px-4 py-2 animate-marquee-reverse">
              {[
                'https://images.pexels.com/photos/1461637/pexels-photo-1461637.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/3205635/pexels-photo-3205635.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/210584/pexels-photo-210584.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=800',
              ].concat([
                'https://images.pexels.com/photos/1461637/pexels-photo-1461637.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/3205635/pexels-photo-3205635.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/210584/pexels-photo-210584.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=800',
              ]).map((src, i) => (
                <div key={i} className="min-w-[20rem] flex-shrink-0 overflow-hidden rounded-2xl border border-[#222] bg-[#111]">
                  <img src={src} alt="project" className="h-56 w-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;