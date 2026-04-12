import React from 'react';
import CartItem from '../Components/CartItem';
import { translations } from '../i18n';

const Cart = ({ cartItems, onAdd, onRemove, setPage, language }) => {
  const t = translations[language];
  // Qiymət hesablamaları
  const itemsPrice = cartItems.reduce((acc, current) => acc + current.qty * current.price, 0);
  const totalPrice = itemsPrice;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-amber-50 to-slate-50 p-8 shadow-xl shadow-amber-100/70">
        <div className="absolute -right-20 -top-24 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-48 w-48 rounded-full bg-slate-200/60 blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-amber-500">{t.cart.orderSummary}</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-slate-900">{t.cart.title}</h2>
          </div>
          <button 
            onClick={() => setPage('home')}
            className="inline-flex items-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Alış-verişə davam et
          </button>
        </div>
      </section>

      {cartItems.length === 0 ? (
        <div className="bg-white p-12 sm:p-16 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 text-center">
          <div className="bg-amber-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-gray-800 mb-2">{t.cart.emptyTitle}</p>
          <p className="text-gray-500 mb-8">{t.cart.emptyText}</p>
          <button 
            onClick={() => setPage('home')}
            className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            {t.buttons.continueShopping}
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
                language={language}
              />
            ))}
          </div>

          {/* Sifariş Xülasəsi (Sağ tərəf) */}
          <div className="lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-xl font-black text-gray-900 mb-6">{t.cart.orderSummary}</h3>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>{t.cart.itemsTotal}</span>
                  <span className="font-semibold text-slate-900">{itemsPrice.toFixed(2)} ₼</span>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">{t.cart.total}</span>
                  <span className="text-2xl font-black text-amber-600">{totalPrice.toFixed(2)} ₼</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl active:scale-[0.98]">
                {t.buttons.checkout}
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4">
                {t.cart.safe}
              </p>
            </div>

            <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-lg font-black text-gray-900 mb-4">{t.cart.contactTitle}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="orderPhone">
                    {t.cart.contactPhone}
                  </label>
                  <input
                    id="orderPhone"
                    type="tel"
                    placeholder={t.cart.contactPhonePlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="orderEmail">
                    {t.cart.contactEmail}
                  </label>
                  <input
                    id="orderEmail"
                    type="email"
                    placeholder={t.cart.contactEmailPlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2" htmlFor="orderNotes">
                    {t.cart.contactNotes}
                  </label>
                  <textarea
                    id="orderNotes"
                    rows={4}
                    placeholder={t.cart.contactNotesPlaceholder}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-400 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
