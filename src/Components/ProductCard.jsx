import { Trash2, Image as ImageIcon } from 'lucide-react';

const ProductCard = ({ product, onDelete }) => (
  <div className="group bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-transparent hover:border-indigo-500 transition-all shadow-sm overflow-hidden">
    <div className="h-48 bg-gray-100 dark:bg-gray-800 relative overflow-hidden flex items-center justify-center">
      {product.image ? (
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      ) : (
        <ImageIcon size={48} className="text-gray-300" />
      )}
      <button onClick={() => onDelete(product.id)} className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
        <Trash2 size={18} />
      </button>
    </div>
    <div className="p-8">
      <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase italic tracking-tighter mb-1 truncate">{product.name}</h3>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">{product.category}</p>
      <div className="flex items-center justify-between border-t dark:border-gray-800 pt-4 text-green-600 font-black text-xl italic tracking-tighter">
        {product.price} ₼ <span className="text-[8px] text-gray-400 uppercase not-italic">GÜNLÜK</span>
      </div>
    </div>
  </div>
);

export default ProductCard;