import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <h1>Loading...</h1>;

  return (
    <div className="flex gap-10 p-10">
      <img src={product.image} className="h-80 object-contain" />
      <div>
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="my-4">{product.description}</p>
        <p className="text-xl text-green-600">${product.price}</p>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 bg-black text-white px-6 py-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}