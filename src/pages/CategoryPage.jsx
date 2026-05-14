import React from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { translations, englishCategoryNames, sectionImages } from '../i18n';

const CategoryPage = ({ page, onAdd, setPage, language, onSelectProduct, cartItems = [] }) => {
  const t = translations[language];
  const section = t.categories[page];
  const sectionProducts = section ? products.filter((item) => item.category === englishCategoryNames[page]) : [];

  if (!section) {
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

  return (
    <div className="space-y-10">
      <section className="rounded-[2rem] overflow-hidden bg-slate-950 text-white shadow-2xl">
        <div className="relative h-96">
          <img
            src={sectionImages[page]}
            alt={section.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/80" />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-12">
            <span className="text-sm uppercase tracking-[0.35em] text-amber-400">{section.title}</span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black leading-tight">{section.title}</h1>
            <p className="mt-4 max-w-3xl text-base text-slate-200">{section.description}</p>
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <button
          onClick={() => setPage('home')}
          className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition"
        >
          ← {t.buttons.backHome}
        </button>
        <p className="text-sm text-gray-500">
          {t.categoryCount.replace('{count}', sectionProducts.length)}
        </p>
      </div>

      {sectionProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {sectionProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={onAdd}
              language={language}
              onSelect={(selected) => onSelectProduct?.(selected, page)}
              cartItems={cartItems}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-gray-500">
          {t.noProducts}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
