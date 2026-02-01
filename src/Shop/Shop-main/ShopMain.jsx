export default function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-sm group">
      
      
      <div className="relative overflow-hidden">
        <img src={product.img} alt="" className="w-full h-[300px] object-cover" />

       
        {product.badge && (
          <span className="absolute top-3 right-3 bg-red-400 text-white text-xs px-2 py-1 rounded-full">
            {product.badge}
          </span>
        )}

        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-3">
          <button className="bg-white px-6 py-2 text-sm font-medium">
            Add to cart
          </button>
          <div className="flex gap-4 text-white text-sm">
            <span>Share</span>
            <span>Compare</span>
            <span>Like</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.desc}</p>

        <div className="flex items-center gap-3 mt-2">
          <span className="font-semibold">{product.price}</span>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              {product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
