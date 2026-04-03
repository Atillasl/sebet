import React from 'react';

const ProductCard = ({ product, onAdd }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-500 mb-2">{product.category}</p>
      
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold text-blue-600">{product.price} ₼</span>
        <button 
          onClick={() => onAdd(product)}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-transform"
        >
          Səbətə at
        </button>
      </div>
    </div>
  );
};

export default ProductCard;