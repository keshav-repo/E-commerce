import React from 'react';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700">
            <img src="/icon.svg" alt="Logo" className="h-12 w-12" />
          </div>
          <div className="flex items-center">
            <div className="flex">
              <Link
                href="#"
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Men
              </Link>
              <Link
                href="#"
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Women
              </Link>
              <Link
                href="#"
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Kids
              </Link>
              <Link
                href="#"
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Home & Living
              </Link>
              <Link
                href="#"
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Beauty
              </Link>
              <Link
                href="#"
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Studio
              </Link>
            </div>
            <div className="ml-4 flex items-center space-x-4">
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                Profile
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                Wishlist
              </Link>
              <Link href="#" className="text-gray-700 hover:text-gray-900">
                Bag
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
