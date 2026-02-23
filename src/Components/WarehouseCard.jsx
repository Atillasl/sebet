import React from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Trash2, ArrowRight } from 'lucide-react';

const WarehouseCard = ({ warehouse, onDelete }) => {
  const { id, name, location, itemCount } = warehouse;

  // Silmə funksiyası (Link-in kliklənməsini dayandırmaq üçün e.preventDefault istifadə olunur)
  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(id);
  };

  return (
    <Link 
      to={`/warehouse/${id}`}
      className="group bg-white dark:bg-gray-900 p-8 rounded-[3rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.03)] border-2 border-transparent hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-2xl transition-all relative overflow-hidden"
    >
      {/* Silmə Düyməsi */}
      <button 
        onClick={handleDelete} 
        className="absolute top-6 right-6 p-3 bg-red-50 dark:bg-red-900/30 text-red-300 dark:text-red-500 rounded-2xl opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:text-white transition-all z-10"
      >
        <Trash2 size={18} />
      </button>

      {/* İkon */}
      <div className="bg-indigo-50 dark:bg-indigo-900/30 w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-8 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 group-hover:rotate-6 transition-all duration-300">
        <Package size={32} strokeWidth={2.5} />
      </div>

      {/* Məlumatlar */}
      <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-2 uppercase tracking-tight italic group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {name}
      </h3>
      
      <div className="flex items-center text-gray-400 dark:text-gray-500 text-xs font-bold mb-8 italic">
        <MapPin size={14} className="mr-1 text-indigo-400 dark:text-indigo-600" /> 
        {location}
      </div>

      {/* Alt hissə (Stok sayı) */}
      <div className="flex items-center justify-between pt-6 border-t-2 border-gray-50 dark:border-gray-800">
        <div className="flex flex-col">
          <span className="text-3xl font-black text-gray-900 dark:text-white leading-none">
            {itemCount}
          </span>
          <span className="text-[9px] font-black text-indigo-400 dark:text-indigo-500 uppercase tracking-widest mt-1">
            Stokda Var
          </span>
        </div>
        
        <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:shadow-lg transition-all">
          <ArrowRight size={24} className="text-gray-300 dark:text-gray-600 group-hover:text-white transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

// React.memo komponentin lazımsız yerə yenidən render olunmasının qarşısını alır (Performance)
export default React.memo(WarehouseCard);