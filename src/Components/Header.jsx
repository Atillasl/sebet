import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Header() {
  const { cart } = useContext(CartContext);

  return (
    <div className="flex justify-between p-6 bg-gray-100">
      <Link to="/" className="font-bold text-xl">
        FakeStore
      </Link>

      <Link to="/cart">
        Cart ({cart.length})
      </Link>
    </div>
  );
}