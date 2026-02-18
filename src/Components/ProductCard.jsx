import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-lg transition">
      <img src={product.image} className="h-40 mx-auto object-contain" />
      <h2 className="font-bold mt-2">{product.title.slice(0, 40)}</h2>
      <p className="text-green-600 font-semibold">${product.price}</p>

      <div className="flex gap-2 mt-3">
        <Link
          to={`/product/${product.id}`}
          className="bg-gray-200 px-3 py-1 rounded"
        >
          Detail
        </Link>

        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}