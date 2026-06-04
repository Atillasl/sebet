import { translations, productCategoryLabels } from '../i18n';

const ProductPage = ({ product, onAdd, setPage, language, previousPage }) => {
  const t = translations[language];

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-semibold text-[#888]">{t.sectionUnavailable}</p>
        <button
          onClick={() => setPage('home')}
          className="mt-6 inline-flex items-center rounded-2xl bg-[#F5A623] px-6 py-3 text-sm font-semibold text-black hover:bg-[#d4891a] transition"
        >
          {t.buttons.backHome}
        </button>
      </div>
    );
  }

  const categoryLabel = productCategoryLabels[language][product.category] || product.category;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          onClick={() => setPage(previousPage || 'home')}
          className="inline-flex items-center rounded-2xl bg-[#111] border border-[#333] px-5 py-3 text-sm font-semibold text-white hover:border-[#F5A623] transition"
        >
          ← {t.productPage.back}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="overflow-hidden rounded-[2rem] bg-[#111] shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#F5A623]">{categoryLabel}</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white">{product.name}</h1>
          </div>

          <div className="rounded-3xl border border-[#222] bg-[#111] p-6 shadow-lg shadow-slate-200/60">
            <h2 className="text-lg font-black text-white">{t.productPage.aboutTitle}</h2>
            <p className="mt-4 text-sm text-[#888] leading-6">{product.description}</p>
            <p className="mt-3 text-sm text-[#555]">{t.productPage.aboutNote}</p>
          </div>

          <div className="rounded-3xl border border-[#222] bg-[#111] p-6 shadow-lg shadow-slate-200/60">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-[#888]">{t.cart.dailyRent}</span>
              <span className="text-2xl font-black text-white">{product.price} ₼</span>
            </div>
            <button
              onClick={() => onAdd(product)}
              className="mt-6 w-full rounded-2xl bg-[#F5A623] hover:bg-[#d4891a] py-3 text-sm font-semibold text-black transition"
            >
              {t.buttons.addToCart}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
