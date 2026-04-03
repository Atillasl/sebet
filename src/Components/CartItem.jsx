import React from 'react';

const CartItem = ({ item, onAdd, onRemove }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow gap-4">
      
      {/* Məhsul Şəkli */}
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-24 h-24 object-cover rounded-xl flex-shrink-0"
      />

      {/* Məhsul Məlumatları */}
      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500 mb-1">{item.category}</p>
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="text-blue-600 font-bold">{item.price} ₼</span>
          <span className="text-xs text-gray-400">x {item.qty}</span>
        </div>
      </div>

      {/* Say İdarəetmə Düymələri */}
      <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-200">
        <button
          onClick={() => onRemove(item)}
          className="w-10 h-10 flex items-center justify-center bg-white text-gray-600 rounded-lg shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors font-bold text-xl"
        >
          {item.qty === 1 ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          ) : "-"}
        </button>

        <span className="px-4 font-bold text-lg text-gray-800 min-w-[40px] text-center">
          {item.qty}
        </span>

        <button
          onClick={() => onAdd(item)}
          className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition-colors font-bold text-xl"
        >
          +
        </button>
      </div>

      {/* Cəm Qiymət (Bu məhsuldan neçə dənədirsə onun cəmi) */}
      <div className="hidden lg:block text-right min-w-[100px]">
        <p className="text-xs text-gray-400 uppercase tracking-wider">Cəmi</p>
        <p className="text-lg font-black text-gray-900">{(item.price * item.qty).toFixed(2)} ₼</p>
      </div>
    </div>
  );
};

export default CartItem;