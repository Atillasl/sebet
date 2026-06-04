import React, { useState } from 'react';
import { translations, productCategoryLabels } from '../i18n';

const ProductCard = ({ product, onAdd, language, onSelect, cartItems = [] }) => {
  const t = translations[language];
  const categoryLabel = productCategoryLabels[language][product.category] || product.category;
  const [addedToCart, setAddedToCart] = useState(false);
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAdd(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div
      className="group bg-[#111] border border-[#222] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F5A623] hover:shadow-[0_8px_30px_rgba(245,166,35,0.1)]"
      onClick={() => onSelect?.(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect?.(product); } }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image || 'https://via.placeholder.com/720x480?text=No+Image'}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105 brightness-75 group-hover:brightness-90"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-[#F5A623] text-black text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md" style={{fontFamily: "'Oswald', sans-serif"}}>
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-black text-lg leading-tight mb-1" style={{fontFamily: "'Oswald', sans-serif"}}>{product.name}</h3>
        <p className="text-[#666] text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">{product.description || '-'}</p>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-[#1f1f1f]">
          <div>
            <p className="text-[#555] text-[10px] uppercase tracking-[0.2em] mb-0.5">{t.cart.dailyRent}</p>
            <span className="text-2xl font-black text-white" style={{fontFamily: "'Oswald', sans-serif"}}>{product.price} <span className="text-[#F5A623]">₼</span></span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`w-10 h-10 rounded-xl transition-all active:scale-95 flex items-center justify-center ${
              isInCart || addedToCart
                ? 'bg-emerald-500 text-white'
                : 'bg-[#F5A623] hover:bg-[#d4891a] text-black'
            }`}
          >
            {isInCart || addedToCart ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;