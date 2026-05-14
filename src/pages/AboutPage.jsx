import { translations } from '../i18n';

const AboutPage = ({ setPage, language }) => {
  const t = translations[language];

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] overflow-hidden bg-slate-950 text-white shadow-2xl">
        <div className="relative h-96">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/90" />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-12">
            <span className="text-sm uppercase tracking-[0.35em] text-amber-400">{t.nav.about}</span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black leading-tight">{t.about.title}</h1>
            <p className="mt-4 max-w-3xl text-base text-slate-200">{t.about.description}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-lg">
        <div className="max-w-4xl">
          <h2 className="text-3xl font-black text-slate-900">{t.about.whyTitle}</h2>
          <p className="mt-5 text-sm leading-7 text-slate-600">{t.about.whyText}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-slate-900">{t.about.missionTitle}</h3>
              <p className="mt-3 text-sm text-slate-600">{t.about.missionText}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="text-xl font-semibold text-slate-900">{t.about.valuesTitle}</h3>
              <p className="mt-3 text-sm text-slate-600">{t.about.valuesText}</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => setPage('equipment')}
              className="inline-flex items-center rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition"
            >
              {t.buttons.home}
            </button>
            <p className="text-sm text-slate-500">{t.about.note}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
