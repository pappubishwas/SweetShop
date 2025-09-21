import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-pink-50 border-t border-pink-200 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-700 font-sans">
        
        {/* Left side */}
        <p className="text-center sm:text-left text-gray-600">
          © {new Date().getFullYear()} Sweet Shop. All rights reserved.
        </p>

        {/* Middle navigation */}
        <div className="flex gap-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-pink-500 font-medium transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/"
            className="text-gray-700 hover:text-pink-500 font-medium transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/"
            className="text-gray-700 hover:text-pink-500 font-medium transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Social links */}
        <div className="flex gap-4 mt-4 sm:mt-0">
          <a
            href="https://github.com/pappubishwas/SweetShop"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-pink-500 transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href="https://x.com/OviPappu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-pink-500 transition-colors duration-300"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
