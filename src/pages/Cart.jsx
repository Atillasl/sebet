import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      {cart.map((item) => (
        <div key={item.id} className="flex justify-between mb-4 border-b pb-2">
          <p>{item.title}</p>
          <div>
            <span className="mr-4">${item.price}</span>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <h2 className="mt-6 text-xl font-bold">
        Total: ${total.toFixed(2)}
      </h2>
    </div>
  );
}