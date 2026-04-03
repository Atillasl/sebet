import React, { useState } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryBar from '../components/CategoryBar'; // Komponenti import edirik

const Home = ({ onAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState('Hamısı');

  // 1. Məhsullardan unikal kateqoriyaları avtomatik çıxarırıq
  const categories = ['Hamısı', ...new Set(products.map(p => p.category))];

  // 2. Seçilmiş kateqoriyaya əsasən məhsulları filter edirik
  const filteredProducts = selectedCategory === 'Hamısı' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Kateqoriya Seçimi Hissəsi */}
      <section>
        <CategoryBar 
          categories={categories} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
      </section>

      {/* Məhsulların Siyahısı */}
      <section>
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAdd={onAdd} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-inner text-gray-400">
            <p className="text-lg font-medium">Bu kateqoriyada məhsul tapılmadı.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;