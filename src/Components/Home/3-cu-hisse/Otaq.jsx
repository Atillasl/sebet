import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

export const Otaq = () => {
  const rooms = [
    {
      img: "/Sekiller/1.jpg",
      title: "Inner Peace",
      type: "Bed Room",
    },
    {
      img: "/Sekiller/2.jpg",
      title: "Modern Space",
      type: "Living Room",
    },
    {
      img: "/Sekiller/4.jpg",
      title: "Cozy Corner",
      type: "Study Room",
    },
  ];

  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % rooms.length);
  };

  return (
    <section className="max-w-[1200px] mx-auto mt-20 flex gap-10 items-start">
      
      {/* SOL TEXT HİSSƏ */}
      <div className="max-w-[420px]">
        <h1 className="text-4xl font-bold mb-4">
          50+ Beautiful rooms inspiration
        </h1>
        <p className="text-gray-500 mb-6">
          Our designer already made a lot of beautiful prototype of rooms that
          inspire you
        </p>
        <button className="bg-[#B88E2F] text-white px-8 py-3 font-semibold">
          Explore More
        </button>
      </div>

      {/* SLIDER HİSSƏSİ */}
      <div>
        <div className="flex gap-6 items-start">
          
          {/* SOL BÖYÜK ŞƏKİL */}
          <div className="relative w-[404px] h-[582px]">
            <img
              src={rooms[index].img}
              alt="Room"
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute bottom-6 left-6 bg-white p-4 w-[217px]">
              <span className="text-sm text-gray-400">
                0{index + 1} — {rooms[index].type}
              </span>
              <h3 className="text-2xl font-bold mt-1">
                {rooms[index].title}
              </h3>

              <button
                onClick={nextSlide}
                className="mt-4 bg-[#B88E2F] text-white w-10 h-10 flex items-center justify-center"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>

          {/* SAĞ PREVIEW */}
          <div className="relative w-[372px] h-[486px]">
            <img
              src={rooms[(index + 1) % rooms.length].img}
              alt="Room"
              className="w-full h-full object-cover"
            />

            <button
              onClick={nextSlide}
              className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow flex items-center justify-center"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* DOTLAR */}
        <div className="flex gap-3 mt-6 ml-[430px]">
          {rooms.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-[#B88E2F]" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Otaq;
