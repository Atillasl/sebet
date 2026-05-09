import { translations, sectionImages } from '../i18n';

const Home = ({ setPage, language }) => {
  const t = translations[language];
  const sectionKeys = ['camera', 'lighting', 'grip', 'studio'];
  const sections = sectionKeys.map((key) => ({
    key,
    title: t.categories[key].title,
    subtitle: t.categories[key].subtitle,
    image: sectionImages[key]
  }));

  return (
    <div className="space-y-10">
      <section className="relative min-h-screen overflow-hidden bg-slate-950 text-white shadow-2xl w-[100vw] left-1/2 right-1/2 -translate-x-1/2 max-w-none">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="https://cdn.pixabay.com/video/2019/06/17/24497-344562750_large.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center sm:px-8">
          <h1 className="max-w-4xl text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
            {t.hero.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed text-gray-200 px-2 sm:px-0">
            {t.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400">{t.exploreTitle}</p>
            <h2 className="mt-4 text-3xl sm:text-4xl font-black text-slate-900">{t.exploreHeadline}</h2>
            <p className="mt-4 text-sm text-slate-500 max-w-2xl mx-auto">{t.exploreSubtitle}</p>
          </div>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setPage(section.key)}
                className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 text-left">
                  <div className="text-xs uppercase tracking-[0.35em] text-amber-500">{section.title}</div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{section.subtitle}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{t.buttons.viewPage}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative w-[100vw] left-1/2 -translate-x-1/2 max-w-none overflow-hidden bg-white py-12">
        <div className="space-y-8">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-400">{t.projects.label}</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900">{t.projects.title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">{t.projects.subtitle}</p>
          </div>

          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950">
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/90 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/90 to-transparent pointer-events-none" />
              <div className="flex w-[200%] gap-4 px-4 py-6 animate-marquee">
                {[
                  'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/2033981/pexels-photo-2033981.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/789349/pexels-photo-789349.jpeg?auto=compress&cs=tinysrgb&w=1200'
                ].concat([
                  'https://images.pexels.com/photos/274973/pexels-photo-274973.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/2033981/pexels-photo-2033981.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/789349/pexels-photo-789349.jpeg?auto=compress&cs=tinysrgb&w=1200'
                ]).map((src, index) => (
                  <div key={`${src}-${index}`} className="min-w-[24rem] flex-shrink-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 shadow-lg">
                    <img src={src} alt="Falkon project" className="h-64 w-full object-cover transition duration-500 hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950">
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/90 to-transparent pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/90 to-transparent pointer-events-none" />
              <div className="flex w-[200%] gap-4 px-4 py-6 animate-marquee-reverse">
                {[
                  'https://images.pexels.com/photos/1461637/pexels-photo-1461637.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/3205635/pexels-photo-3205635.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/210584/pexels-photo-210584.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1200'
                ].concat([
                  'https://images.pexels.com/photos/1461637/pexels-photo-1461637.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/3205635/pexels-photo-3205635.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/210584/pexels-photo-210584.jpeg?auto=compress&cs=tinysrgb&w=1200',
                  'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1200'
                ]).map((src, index) => (
                  <div key={`${src}-${index}`} className="min-w-[24rem] flex-shrink-0 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 shadow-lg">
                    <img src={src} alt="Falkon project" className="h-64 w-full object-cover transition duration-500 hover:scale-105" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;