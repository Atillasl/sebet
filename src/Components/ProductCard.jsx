import React from 'react';
import { translations, productCategoryLabels } from '../i18n';

const ProductCard = ({ product, onAdd, language, onSelect }) => {
  const t = translations[language];
  const categoryLabel = productCategoryLabels[language][product.category] || product.category;
  return (
    <div
      className="bg-white p-5 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 w-full cursor-pointer"
      onClick={() => onSelect?.(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelect?.(product);
        }
      }}
    >
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-44 sm:h-48 object-cover rounded-3xl mb-5"
      />
      <div className="space-y-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
          <p className="text-sm uppercase text-amber-500 font-semibold tracking-[0.2em]">{categoryLabel}</p>
        </div>
        <p className="text-sm text-gray-500 min-h-[2.5rem]">{product.description}</p>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">{t.cart.dailyRent}</p>
          <span className="text-2xl font-black text-slate-900">{product.price} ₼</span>
        </div>
        <button 
          onClick={(event) => {
            event.stopPropagation();
            onAdd(product);
          }}
          className="bg-slate-900 text-white px-4 py-3 rounded-2xl hover:bg-slate-800 active:scale-95 transition-transform font-semibold"
        >
          {t.buttons.addToCart}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
