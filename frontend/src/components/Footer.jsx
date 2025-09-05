import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-tertiary text-white pt-12 pb-6">
      <div className="max-padd-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-4">MyStore</h2>
          <p className="text-gray-400 text-sm leading-6">
            Discover the latest trends in fashion. We bring you premium quality
            clothing, footwear, and accessories at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/collection" className="hover:text-white">Collection</Link></li>
            <li><Link to="/blogs" className="hover:text-white">Blogs</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link to="/collection/men" className="hover:text-white">Men</Link></li>
            <li><Link to="/collection/women" className="hover:text-white">Women</Link></li>
            <li><Link to="/collection/kids" className="hover:text-white">Kids</Link></li>
            <li><Link to="/collection/footwear" className="hover:text-white">Footwear</Link></li>
            <li><Link to="/collection/winterwear" className="hover:text-white">Winterwear</Link></li>
            <li><Link to="/collection/sportswear" className="hover:text-white">Sportswear</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition">
              <FaTwitter />
            </a>
            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/20 mt-10 pt-4 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
