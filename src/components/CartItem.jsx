import { translations } from '../i18n';
import { productCategoryLabels } from '../i18n';

const CartItem = ({ item, onAdd, onRemove, language }) => {
  const t = translations[language];
  const categoryLabel = productCategoryLabels[language][item.category] || item.category;

  return (
    <div className="flex flex-col sm:flex-row items-center bg-[#111] border border-[#222] hover:border-[#F5A623] p-4 rounded-2xl transition-all duration-200 gap-4">
      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-xl flex-shrink-0 brightness-90" />

      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-white font-black text-lg leading-tight" style={{fontFamily: "'Oswald', sans-serif"}}>{item.name}</h3>
        <p className="text-[#F5A623] text-xs uppercase tracking-wider font-bold mt-0.5">{categoryLabel}</p>
        <p className="text-[#888] text-sm mt-1">{item.price} ₼ {t.currencyPerDay}</p>
      </div>

      {/* Qty */}
      <div className="flex items-center bg-[#1a1a1a] border border-[#333] p-1 rounded-xl gap-1">
        <button
          onClick={() => onRemove(item)}
          className="w-9 h-9 flex items-center justify-center bg-[#222] text-[#888] rounded-lg hover:bg-red-900/40 hover:text-red-400 transition-colors"
        >
          {item.qty === 1 ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ) : <span className="font-black text-base">−</span>}
        </button>
        <span className="px-4 font-black text-white min-w-[36px] text-center" style={{fontFamily: "'Oswald', sans-serif"}}>{item.qty}</span>
        <button
          onClick={() => onAdd(item)}
          className="w-9 h-9 flex items-center justify-center bg-[#F5A623] text-black rounded-lg hover:bg-[#d4891a] transition-colors font-black text-base"
        >
          +
        </button>
      </div>

      {/* Total */}
      <div className="hidden lg:block text-right min-w-[90px]">
        <p className="text-[#444] text-[10px] uppercase tracking-wider">Cəm</p>
        <p className="text-white font-black text-lg" style={{fontFamily: "'Oswald', sans-serif"}}>{(item.price * item.qty).toFixed(2)} <span className="text-[#F5A623]">₼</span></p>
      </div>
    </div>
  );
};

export default CartItem;