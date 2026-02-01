import React from "react";

export const Hero = () => {
  return (
    <main className="w-[1440px] h-[716.828px] relative rotate-0  opacity-100">
      {/* Background Image */}
      <img
        src="/Sekiller/hero.jpg"
        alt="Hero"
        className="w-full h-full object-cover"
      />

      {/* Hero Content Box */}
      <div className="absolute top-[253px] left-[739px] w-[643px] h-[443px] rounded-[10px] bg-[#FFF3E3]">
        <div className="absolute top-[62px] left-[39px] w-[561px] h-[344px] flex flex-col">
          {/* Small Label */}
          <p className="text-gray-600 text-sm mb-2">New Arrival</p>

          {/* Main Heading */}
          <h1 className="font-poppins font-bold text-[52px] leading-[65px] tracking-[0px] text-[#B88E2F]">
            Discover our
          </h1>

          {/* "New Collection" golden text below */}
          <span className="font-poppins font-bold text-[52px] leading-[65px] tracking-[0px] text-[#B88E2F] mt-2">
            New Collection
          </span>

          {/* Description */}
          <p className="text-gray-700 text-sm mt-6 w-[546px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            lacinia, massa non fringilla sollicitudin, lorem tortor hendrerit
            odio, dictum dapibus tellus dolor ac nunc. In nulla purus, finibus
            vel nisl ut, vehicula pharetra sapien. Integer et nunc nunc. Nunc
            velit justo, pellentesque fermentum consectetur ut, lacinia sit
            amet diam.
          </p>

          {/* Button */}
          <button className="mt-6 w-[222px] h-[74px] bg-[#B88E2F] text-white font-bold rounded-[1px] hover:bg-[#B88E2F] border-none outline-none">
            Buy Now
          </button>
        </div>
      </div>
    </main>
  );
};
