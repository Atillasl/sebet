import React from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Trash2, ArrowRight, Box } from 'lucide-react';

const WarehouseCard = ({ warehouse, onDelete }) => {
  const { id, name, location, itemCount } = warehouse;

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation(); 
    if(window.confirm(`${name} sektorunu silmək istədiyinizə əminsiniz?`)) {
      onDelete(id);
    }
  };

  return (
    <Link 
      to={`/warehouse/${id}`}
      className="group relative block bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border-2 border-gray-100 dark:border-gray-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(79,70,229,0.15)] transition-all duration-500 ease-out"
    >
      {/* Üst Dekorativ Xətt */}
      <div className="absolute top-0 left-10 right-10 h-1 bg-indigo-600 rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      {/* ZİBİL QUTUSU: Sağ yuxarı küncdə qaldı */}
      <button 
        onClick={handleDelete} 
        className="absolute top-6 right-6 p-2 text-gray-300 dark:text-gray-600 hover:text-red-500 dark:hover:text-red-400 transition-colors z-20"
        title="Sektoru Sil"
      >
        <Trash2 size={20} strokeWidth={1.5} />
      </button>

      {/* İkon və Başlıq Hissəsi */}
      <div className="flex items-start justify-between mb-8">
        <div className="bg-gray-50 dark:bg-gray-800/50 w-16 h-16 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500 shadow-inner">
          <Box size={30} strokeWidth={1.5} />
        </div>
        
        {/* AKTİV SEKTOR SÖZÜ: İkonun yanına (sağa deyil, bir az mərkəzə) sürüşdürdük */}
        <div className="mr-10 mt-1"> 
           <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-lg">
             Aktiv Sektor
           </span>
        </div>
      </div>

      {/* Məlumatlar */}
      <div className="mb-10">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-tight mb-2 group-hover:translate-x-1 transition-transform">
          {name}
        </h3>
        <div className="flex items-center text-gray-400 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest">
          <MapPin size={12} className="mr-1.5 text-indigo-500" /> 
          {location || "Ümumi Anbar"}
        </div>
      </div>

      {/* Alt hissə */}
      <div className="flex items-end justify-between">
        <div>
          <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter italic leading-none mb-1">
            {itemCount}
          </div>
          <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
            Mövcud Texnika
          </div>
        </div>
        
        <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 p-4 rounded-2xl group-hover:rotate-12 transition-all duration-300 shadow-xl">
          <ArrowRight size={20} strokeWidth={3} />
        </div>
      </div>
    </Link>
  );
};

export default React.memo(WarehouseCard);