import React from "react";

const products = [
  {
    img: "./Sekiller/stul.png",
    name: "Syltherine",
    desc: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: "Rp 3.500.000",
  },
  {
    img: "./Sekiller/1.jpg",
    name: "Alcove",
    desc: "Modern lounge chair",
    price: "Rp 3.200.000",
    oldPrice: "Rp 4.000.000",
  },
  {
    img: "./Sekiller/2.jpg",
    name: "Cosmo",
    desc: "Comfortable office chair",
    price: "Rp 1.800.000",
    oldPrice: "Rp 2.200.000",
  },
  {
    img: "./Sekiller/4.jpg",
    name: "Nova",
    desc: "Elegant dining chair",
    price: "Rp 2.700.000",
    oldPrice: "Rp 3.100.000",
  },
  {
    img: "./Sekiller/3.png",
    name: "Luna",
    desc: "Stylish accent chair",
    price: "Rp 2.600.000",
    oldPrice: "Rp 3.000.000",
  },
  {
    img: "./Sekiller/4.jpg",
    name: "Orion",
    desc: "Modern office chair",
    price: "Rp 2.900.000",
    oldPrice: "Rp 3.400.000",
  },
  {
    img: "./Sekiller/5.png",
    name: "Vega",
    desc: "Luxury lounge chair",
    price: "Rp 3.500.000",
    oldPrice: "Rp 4.000.000",
  },
  {
    img: "./Sekiller/6.png",
    name: "Stella",
    desc: "Comfortable chair",
    price: "Rp 2.400.000",
    oldPrice: "Rp 3.000.000",
  },
];

export const Cart = () => {
  return (
    <section className="max-w-[1236px] mx-auto mt-[100px] p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>

      <div className="grid grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col w-[285px] rounded-lg">
            {/* Şəkil */}
            <img
              src={product.img}
              alt={product.name}
              className="w-[285px] h-[301px] object-cover rounded-t-lg"
            />

            {/* Mətn bölməsi */}
            <div className="flex flex-col justify-between h-[145px] bg-[#F4F5F7] p-4 rounded-b-lg">
              <div>
                <h2 className="text-lg font-semibold text-start">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-start">{product.desc}</p>
              </div>
              <div className="flex gap-2 items-center mt-2">
                <h2 className="font-bold text-lg">{product.price}</h2>
                <span className="text-gray-400 line-through">
                  {product.oldPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Button */}
      <div className="flex justify-center mt-12">
        <button className="px-12 py-3 border border-[#B88E2F] text-[#B88E2F] font-semibold hover:bg-[#B88E2F] hover:text-white transition">
          Show More
        </button>
      </div>
    </section>
  );
};

export default Cart;
