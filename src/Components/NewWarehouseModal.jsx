import React, { useState } from 'react';
import { X } from 'lucide-react';

const NewWarehouseModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: '', location: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location) return;
    
    onSubmit(formData.name, formData.location);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 dark:bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-[100] animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-[3.5rem] p-10 w-full max-w-md shadow-2xl border-t-[15px] border-indigo-600 animate-in zoom-in duration-300">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tighter italic">
            Yeni Sektor Aç
          </h2>
          <button 
            onClick={onClose} 
            className="p-3 bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-red-500 rounded-2xl transition-all"
          >
            <X size={24} strokeWidth={3} />
          </button>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-4 tracking-[0.2em]">
              Sektorun Adı
            </label>
            <input 
              required
              name="name"
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent p-5 rounded-[1.5rem] focus:border-indigo-100 dark:focus:border-indigo-900 focus:bg-white dark:focus:bg-gray-900 outline-none font-black text-gray-700 dark:text-white transition-all"
              placeholder="Məs: Şimal Portu"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-4 tracking-[0.2em]">
              Koordinatlar (Ünvan)
            </label>
            <input 
              required
              name="location"
              className="w-full bg-gray-50 dark:bg-gray-800 border-2 border-transparent p-5 rounded-[1.5rem] focus:border-indigo-100 dark:focus:border-indigo-900 focus:bg-white dark:focus:bg-gray-900 outline-none font-black text-gray-700 dark:text-white transition-all"
              placeholder="Məs: Bakı, Sahil"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black shadow-xl border-b-8 border-indigo-800 hover:brightness-110 active:border-b-0 active:translate-y-2 transition-all uppercase text-xs tracking-[0.2em]"
          >
            Sektoru Təsdiqlə 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewWarehouseModal;