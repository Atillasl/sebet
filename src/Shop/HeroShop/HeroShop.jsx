
import { CiFilter } from "react-icons/ci";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineViewList } from "react-icons/hi";

export default function ShopHeader() {
  return (
    <div className="w-full">
      
     
      <div
        className="h-[250px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/Sekiller/shop-bg.jpg')" }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-semibold">Shop</h1>
          <p className="text-sm mt-2">Home &gt; Shop</p>
        </div>
      </div>

      
      <div className="bg-[#F9F1E7]">
        <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-center justify-between">
          
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer">
              <CiFilter className="text-xl" />
              <span>Filter</span>
            </div>

            <HiOutlineViewGrid className="text-xl cursor-pointer" />
            <HiOutlineViewList className="text-xl cursor-pointer" />

            <span className="text-sm text-gray-600">
              Showing 1-16 of 32 results
            </span>
          </div>

          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <input
                type="text"
                value="16"
                readOnly
                className="w-12 h-8 text-center border border-gray-300 bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <span>Sort by</span>
              <select className="h-8 px-2 border border-gray-300 bg-white">
                <option>Default</option>
                <option>Price</option>
                <option>Name</option>
              </select>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
