import React from 'react';
import CartItem from '../components/CartItem';

const Cart = ({ cartItems, onAdd, onRemove, setPage }) => {
  // Qiymət hesablamaları
  const itemsPrice = cartItems.reduce((acc, current) => acc + current.qty * current.price, 0);
  const taxPrice = itemsPrice * 0.05; // 5% ƏDV
  const shippingPrice = itemsPrice > 2000 ? 0 : 20; // 2000 AZN üzəri çatdırılma pulsuz
  const totalPrice = itemsPrice + taxPrice + (itemsPrice > 0 ? shippingPrice : 0);

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Səbətiniz</h2>
        <button 
          onClick={() => setPage('home')}
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Alış-verişə davam et
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white p-16 rounded-3xl shadow-sm border border-gray-100 text-center">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-2">Səbətiniz boşdur</p>
          <p className="text-gray-500 mb-8">Görünür hələ seçim etməmisiniz.</p>
          <button 
            onClick={() => setPage('home')}
            className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Məhsullara bax
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Məhsul Siyahısı */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem 
                key={item.id} 
                item={item} 
                onAdd={onAdd} 
                onRemove={onRemove} 
              />
            ))}
          </div>

          {/* Sifariş Xülasəsi (Sağ tərəf) */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
              <h3 className="text-xl font-black text-gray-900 mb-6">Sifariş Xülasəsi</h3>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Məhsul cəmi:</span>
                  <span className="font-semibold text-gray-900">{itemsPrice.toFixed(2)} ₼</span>
                </div>
                <div className="flex justify-between">
                  <span>Vergi (5%):</span>
                  <span className="font-semibold text-gray-900">{taxPrice.toFixed(2)} ₼</span>
                </div>
                <div className="flex justify-between">
                  <span>Çatdırılma:</span>
                  <span className={`font-semibold ${shippingPrice === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {shippingPrice === 0 ? 'Pulsuz' : `${shippingPrice.toFixed(2)} ₼`}
                  </span>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Yekun:</span>
                  <span className="text-2xl font-black text-blue-600">{totalPrice.toFixed(2)} ₼</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-xl active:scale-[0.98]">
                Ödənişə keç
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4">
                Təhlükəsiz ödəniş və sürətli çatdırılma zəmanəti.
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;