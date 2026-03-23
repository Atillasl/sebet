import { Trash2, Image as ImageIcon } from 'lucide-react';

const ProductCard = ({ product, onDelete }) => (
  <div className="group bg-white dark:bg-[#0D1117] rounded-[3rem] border-2 border-transparent hover:border-yellow-500 transition-all shadow-sm overflow-hidden">
    <div className="h-48 bg-slate-100 dark:bg-white/5 relative overflow-hidden flex items-center justify-center">
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      ) : (
        <ImageIcon size={48} className="text-slate-300 dark:text-slate-700" />
      )}
      <button 
        onClick={() => onDelete(product.id)} 
        className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-[#0D1117]/90 backdrop-blur-md rounded-xl text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-90 shadow-lg"
      >
        <Trash2 size={18} />
      </button>
    </div>
    <div className="p-8">
      <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase italic tracking-tighter mb-1 truncate">
        {product.name}
      </h3>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
        {product.category}
      </p>
      <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-4 text-yellow-600 dark:text-yellow-500 font-black text-xl italic tracking-tighter">
        {product.price} ₼ <span className="text-[8px] text-slate-400 dark:text-slate-500 uppercase not-italic tracking-widest">GÜNLÜK</span>
      </div>
    </div>
  </div>
);

export default ProductCard;