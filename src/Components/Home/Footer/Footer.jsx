const Footer = () => {
  return (
    <footer className="border-t border-gray-200 px-20 pt-16 pb-6 text-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Logo & Address */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Funiro.</h2>
          <p className="text-gray-500 leading-6">
            400 University Drive Suite 200 <br />
            Coral Gables, <br />
            FL 33134 USA
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold mb-4">Links</h4>
          <ul className="space-y-3 text-gray-500">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">Shop</li>
            <li className="hover:text-black cursor-pointer">About</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="font-semibold mb-4">Help</h4>
          <ul className="space-y-3 text-gray-500">
            <li className="hover:text-black cursor-pointer">Payment Options</li>
            <li className="hover:text-black cursor-pointer">Returns</li>
            <li className="hover:text-black cursor-pointer">Privacy Policies</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <div className="flex items-center gap-3">
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="border-b border-black outline-none pb-1 placeholder:text-gray-400"
            />
            <button className="font-semibold hover:opacity-70">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-gray-200 pt-4 text-gray-500">
        2023 Funiro. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
