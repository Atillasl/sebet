import { VscAccount } from "react-icons/vsc";
import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Hero } from "../Hero/Hero";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="w-[1440px] h-[100px] rotate-0 opacity-100 relative">
      
      {/* Header */}
      <header className="w-full h-[100px] relative">
        <div className="w-[1286px] h-[41px] absolute top-[29px] left-[54px] flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center w-[185px] h-[41px] gap-[5px]">
            <img
              src="./Sekiller/basliq.png"
              alt="Furniro"
              className="w-[80px] h-[62px]"
            />
            <h2 className="w-[130px] h-[41px] text-[34px] font-montserrat font-bold leading-[100%] tracking-[0px]">
              Furniro
            </h2>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-[48px] w-[430px] h-[24px] text-gray-600 font-medium">
             <Link to="/">
            <span className="cursor-pointer hover:text-black w-[48px] h-[24px]">Home</span>
            </Link>
            <Link to="/Shop">
            <span className="cursor-pointer hover:text-black w-[48px] h-[24px]">Shop</span>
</Link>
            <span className="cursor-pointer hover:text-black w-[48px] h-[24px]">About</span>
            <span className="cursor-pointer hover:text-black w-[48px] h-[24px]">Contact</span>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-[28px] text-gray-700 text-xl">
            <VscAccount className="cursor-pointer w-[28px] h-[28px]" />
            <CiSearch className="cursor-pointer w-[28px] h-[28px]" />
            <FaRegHeart className="cursor-pointer w-[28px] h-[28px]" />
            <AiOutlineShoppingCart className="cursor-pointer w-[28px] h-[28px]" />
          </div>
        </div>
      </header>

      {/* Hero */}
      {/* <Hero /> */}
    </div>
  );
}

export default Header;
