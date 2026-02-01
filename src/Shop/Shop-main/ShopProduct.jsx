import ProductCard from "./ShopMain";

const products = [
  {
    img: "/Sekiller/1.jpg",
    name: "Syltherine",
    desc: "Stylish cafe chair",
    price: "Rp 2.500.000",
    oldPrice: "Rp 3.500.000",
    badge: "-30%",
  },
  {
    img: "/Sekiller/2.jpg",
    name: "Leviosa",
    desc: "Stylish cafe chair",
    price: "Rp 2.500.000",
  },
  {
    img: "/Sekiller/3.jpg",
    name: "Lolito",
    desc: "Luxury big sofa",
    price: "Rp 7.000.000",
    oldPrice: "Rp 14.000.000",
    badge: "-50%",
  },
  {
    img: "/Sekiller/4.jpg",
    name: "Respira",
    desc: "Outdoor bar table",
    price: "Rp 500.000",
    badge: "New",
  },
  {
    img: "/Sekiller/4.jpg",
    name: "Respira",
    desc: "Outdoor bar table",
    price: "Rp 500.000",
    badge: "New",
  },
  {
    img: "/Sekiller/4.jpg",
    name: "Respira",
    desc: "Outdoor bar table",
    price: "Rp 500.000",
    badge: "New",
  },
  {
    img: "/Sekiller/4.jpg",
    name: "Respira",
    desc: "Outdoor bar table",
    price: "Rp 500.000",
    badge: "New",
  },
  {
    img: "/Sekiller/4.jpg",
    name: "Respira",
    desc: "Outdoor bar table",
    price: "Rp 500.000",
    badge: "New",
  },
  {
    img: "/Sekiller/4.jpg",
    name: "Respira",
    desc: "Outdoor bar table",
    price: "Rp 500.000",
    badge: "New",
  },
  {
    img: "/Sekiller/4.jpg",
    name: "Respira",
    desc: "Outdoor bar table",
    price: "Rp 500.000",
    badge: "New",
  },
  {
    img: "/Sekiller/4.jpg",
    name: "Respira",
    desc: "Outdoor bar table",
    price: "Rp 500.000",
    badge: "New",
  },
  {
    img: "/Sekiller/4.jpg",
    name: "Respira",
    desc: "Outdoor bar table",
    price: "Rp 500.000",
    badge: "New",
  },
 
];

export default function ShopProducts() {
  return (
    <div className="max-w-[1440px] mx-auto px-8 py-12">
      
      
      <div className="grid grid-cols-4 gap-8">
        {products.map((item, index) => (
          <ProductCard key={index} product={item} />
        ))}
      </div>

      
      <div className="flex justify-center gap-3 mt-12">
        <button className="w-10 h-10 bg-[#B88E2F] text-white">1</button>
        <button className="w-10 h-10 bg-[#F9F1E7]">2</button>
        <button className="w-10 h-10 bg-[#F9F1E7]">3</button>
        <button className="px-6 h-10 bg-[#F9F1E7]">Next</button>
      </div>

    </div>
  );
}
