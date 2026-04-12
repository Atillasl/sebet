import React from 'react';
import { translations, productCategoryLabels } from '../i18n';

const ProductPage = ({ product, onAdd, setPage, language, previousPage }) => {
  const t = translations[language];

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-semibold text-gray-700">{t.sectionUnavailable}</p>
        <button
          onClick={() => setPage('home')}
          className="mt-6 inline-flex items-center rounded-2xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition"
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
          className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition"
        >
          ← {t.productPage.back}
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="overflow-hidden rounded-[2rem] bg-slate-100 shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-500">{categoryLabel}</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900">{product.name}</h1>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <h2 className="text-lg font-black text-slate-900">{t.productPage.aboutTitle}</h2>
            <p className="mt-4 text-sm text-slate-600 leading-6">{product.description}</p>
            <p className="mt-3 text-sm text-slate-400">{t.productPage.aboutNote}</p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{t.cart.dailyRent}</span>
              <span className="text-2xl font-black text-slate-900">{product.price} ₼</span>
            </div>
            <button
              onClick={() => onAdd(product)}
              className="mt-6 w-full rounded-2xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
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
