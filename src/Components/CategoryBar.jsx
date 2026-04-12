import React from 'react';

const CategoryBar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 overflow-x-auto pb-6 scrollbar-hide sm:justify-start">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`
            px-6 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-300 border
            ${
              selectedCategory === category
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105'
                : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400 hover:text-blue-500'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;