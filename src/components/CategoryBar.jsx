const CategoryBar = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-wrap items-center gap-2 pb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-5 py-2 rounded-lg whitespace-nowrap text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
            selectedCategory === category
              ? 'bg-[#F5A623] text-black border-[#F5A623]'
              : 'bg-[#111] text-[#666] border-[#333] hover:border-[#F5A623] hover:text-white'
          }`}
          style={{fontFamily: "'Oswald', sans-serif", letterSpacing: '0.1em'}}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;