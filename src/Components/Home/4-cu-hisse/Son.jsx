import React from "react";

const images = [
  "/Sekiller/1.jpg",
  "/Sekiller/2.jpg",
  "/Sekiller/3.png",
  "/Sekiller/4.jpg",
  "/Sekiller/5.png",
  "/Sekiller/6.png",
  "/Sekiller/1.jpg",
  "/Sekiller/2.jpg",
  "/Sekiller/4.jpg",
];

const Son = () => {
  return (
    <section className="max-w-[1440px] mx-auto mt-32 px-6 ">
      {/* TITLE */}
      <div className="text-center mb-12">
        <p className="text-gray-500 mb-2">Share your setup with</p>
        <h2 className="text-3xl font-bold">#FuniroFurniture</h2>
      </div>

      {/* GALLERY */}
      <div className="grid grid-cols-5 gap-4">

        {/* LEFT BLOCK */}
        <div className="flex flex-col gap-4 col-span-2">
          {[0, 1].map((i) => (
            <img
              key={i}
              src={images[i]}
              alt="" // <-- dekorativ şəkil üçün boş alt
              className={`object-cover ${i === 0 ? "h-[240px]" : "h-[380px]"}`}
            />
          ))}
        </div>

        {/* CENTER LARGE */}
        <div className="col-span-1">
          <img src={images[2]} alt="" className="h-[520px] w-full object-cover" />
        </div>

        {/* RIGHT BLOCK */}
        <div className="flex flex-col gap-4 col-span-2">
          {[3, 4].map((i) => (
            <img key={i} src={images[i]} alt="" className="h-[300px] object-cover" />
          ))}
        </div>

        {/* BOTTOM ROW */}
        <div className="col-span-2">
          <img src={images[5]} alt="" className="h-[260px] w-full object-cover" />
        </div>
        <div className="col-span-1">
          <img src={images[6]} alt="" className="h-[260px] w-full object-cover" />
        </div>
        <div className="col-span-2 flex gap-4">
          {[7, 8].map((i) => (
            <img key={i} src={images[i]} alt="" className="h-[260px] w-1/2 object-cover" />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Son;
