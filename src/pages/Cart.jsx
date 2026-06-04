import React, { useState } from 'react';
import CartItem from '../components/CartItem';
import emailjs from '@emailjs/browser';
import { translations } from '../i18n';

const Cart = ({ cartItems, onAdd, onRemove, setPage, language, clearCart }) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState('');
  const [orderError, setOrderError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', note: '' });
  const t = translations[language];
  // Qiymət hesablamaları
  const itemsPrice = cartItems.reduce((acc, current) => acc + current.qty * current.price, 0);
  const totalPrice = itemsPrice;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    setOrderError('');
    setOrderSuccess('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setOrderError(t.cart.requiredFieldsError);
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          to_email: process.env.REACT_APP_OWNER_EMAIL,
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          customer_note: formData.note,
          order_items: cartItems.map((i) => `${i.name} x${i.qty} - ${i.price} AZN`).join('\n'),
          total: `${totalPrice.toFixed(2)} AZN`
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      clearCart?.();
      setIsOrderModalOpen(false);
      setFormData({ name: '', email: '', phone: '', note: '' });
      setOrderSuccess(t.cart.orderSuccess);
    } catch (error) {
      setOrderError(error?.text || t.cart.orderError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-[#222] bg-[#111] p-8 shadow-xl">
        <div className="absolute -right-20 -top-24 h-48 w-48 rounded-full bg-[#111] blur-3xl" />
        <div className="absolute -left-24 -bottom-24 h-48 w-48 rounded-full bg-[#111] blur-3xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-[#F5A623]">{t.cart.orderSummary}</p>
            <h2 className="mt-3 text-3xl sm:text-4xl font-black text-white">{t.cart.title}</h2>
          </div>
          <button 
            onClick={() => setPage('home')}
            className="inline-flex items-center rounded-2xl border border-[#333] bg-[#111] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:border-[#F5A623]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Alış-verişə davam et
          </button>
        </div>
      </section>

      {cartItems.length === 0 ? (
        <div className="bg-[#111] p-12 sm:p-16 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-[#222] text-center">
          <div className="bg-[#1a1a1a] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#F5A623]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <p className="text-2xl font-bold text-white mb-2">{t.cart.emptyTitle}</p>
          <p className="text-[#888] mb-8">{t.cart.emptyText}</p>
          <button 
            onClick={() => setPage('home')}
            className="bg-[#F5A623] text-black px-8 py-3 rounded-2xl font-bold hover:bg-[#d4891a] transition-all shadow-lg shadow-slate-200"
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
            <div className="bg-[#111] p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-[#222]">
              <h3 className="text-xl font-black text-white mb-6">{t.cart.orderSummary}</h3>
              
              <div className="space-y-4 text-[#888]">
                <div className="flex justify-between">
                  <span>{t.cart.itemsTotal}</span>
                  <span className="font-semibold text-white">{itemsPrice.toFixed(2)} ₼</span>
                </div>
                <div className="pt-4 mt-4 border-t border-[#333] flex justify-between items-center">
                  <span className="text-lg font-bold text-white">{t.cart.total}</span>
                  <span className="text-2xl font-black text-[#F5A623]">{totalPrice.toFixed(2)} ₼</span>
                </div>
              </div>

              <button
                onClick={() => setIsOrderModalOpen(true)}
                className="w-full mt-8 bg-[#F5A623] hover:bg-[#d4891a] text-black py-4 rounded-2xl font-bold transition-all shadow-xl active:scale-[0.98]"
              >
                {t.buttons.checkout}
              </button>

              {orderSuccess && (
                <p className="mt-4 rounded-2xl bg-emerald-900/30 px-4 py-3 text-sm font-medium text-emerald-400">
                  {orderSuccess}
                </p>
              )}

              <p className="text-center text-xs text-gray-400 mt-4">
                {t.cart.safe}
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-[#222]">
              <h3 className="text-lg font-black text-white mb-4">{t.cart.contactTitle}</h3>
              <p className="text-sm text-[#888]">{t.cart.contactHiddenNote}</p>
            </div>
          </div>

        </div>
      )}

      {isOrderModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 px-4">
          <div className="w-full max-w-xl rounded-3xl bg-[#111] p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-2xl font-black text-white">{t.cart.orderModalTitle}</h3>
              <button
                onClick={() => setIsOrderModalOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-semibold text-[#888] hover:bg-[#222] hover:text-white"
              >
                {t.buttons.close}
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmitOrder}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#aaa]" htmlFor="customerName">
                  {t.cart.customerName}
                </label>
                <input
                  id="customerName"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-[#333] bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none transition focus:border-[#F5A623]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#aaa]" htmlFor="customerEmail">
                    {t.cart.contactEmail}
                  </label>
                  <input
                    id="customerEmail"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-2xl border border-[#333] bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none transition focus:border-[#F5A623]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#aaa]" htmlFor="customerPhone">
                    {t.cart.contactPhone}
                  </label>
                  <input
                    id="customerPhone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-2xl border border-[#333] bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none transition focus:border-[#F5A623]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#aaa]" htmlFor="customerNote">
                  {t.cart.contactNotes}
                </label>
                <textarea
                  id="customerNote"
                  name="note"
                  rows={4}
                  value={formData.note}
                  onChange={handleInputChange}
                  placeholder={t.cart.contactNotesPlaceholder}
                  className="w-full resize-none rounded-2xl border border-[#333] bg-[#1a1a1a] px-4 py-3 text-sm text-white outline-none transition focus:border-[#F5A623]"
                />
              </div>

              <div className="rounded-2xl bg-[#1a1a1a] p-4 text-sm text-[#aaa]">
                <p className="font-semibold text-white">{t.cart.orderSummary}</p>
                <p>{cartItems.map((i) => `${i.name} x${i.qty}`).join(', ')}</p>
                <p className="mt-2 font-bold">{t.cart.total}: {totalPrice.toFixed(2)} AZN</p>
              </div>

              {orderError && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{orderError}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-[#F5A623] hover:bg-[#d4891a] py-3 font-bold text-black transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? t.cart.sendingOrder : t.buttons.checkout}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
