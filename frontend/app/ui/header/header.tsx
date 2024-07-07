import React from 'react';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import {
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineSearch,
} from 'react-icons/ai';
import SearchInput from './search';
import Profile from './profile';

const Header = () => {
  return (
    <header className="fixed top-0 z-10 w-full bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700">
            <img src="/icon.svg" alt="Logo" className="h-12 w-12" />
          </div>
          <div className="flex items-center space-x-4">
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
          <div className="mx-4 flex flex-1 items-center justify-center">
            <SearchInput />
          </div>

          <div className="flex items-center space-x-4">
            <Profile />
            <Link
              href="#"
              className="flex flex-col items-center text-gray-700 hover:text-gray-900"
            >
              <AiOutlineHeart className="text-2xl" />
              <span className="text-sm">Wishlist</span>
            </Link>
            <Link
              href="#"
              className="flex flex-col items-center text-gray-700 hover:text-gray-900"
            >
              <AiOutlineShoppingCart className="text-2xl" />
              <span className="text-sm">Bag</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
