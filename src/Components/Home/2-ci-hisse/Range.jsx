import React from "react";

const items = [
  { img: "./Sekiller/b.png", label: "Dining" },
  { img: "./Sekiller/c.png", label: "Living" },
  { img: "./Sekiller/a.png", label: "Bedroom" },
];

export const Range = () => {
  return (
    <section className="w-full max-w-[1440px] mx-auto mt-[100px] px-8">
      
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold">Browse The Range</h1>
        <p className="text-gray-600 mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* Images */}
      <div className="flex justify-center gap-4 flex-wrap">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={item.img}
              alt={item.label}
              className="w-[381px] h-[480px] object-cover rounded-lg"
            />
            <span className="mt-2 text-lg font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Range;
