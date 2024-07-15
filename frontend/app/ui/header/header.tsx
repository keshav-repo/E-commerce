import React from 'react';
import Link from 'next/link';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import SearchInput from './search';
import Profile from './profile';
import NavLinks from './NavLinks';

interface HeaderProps {
  navItems: string[];
}

const Header: React.FC<HeaderProps> = ({ navItems }) => {
  return (
    <header className="fixed top-0 z-10 w-full bg-white shadow">
      <div className="container mx-auto px-6 py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="text-xl font-semibold text-gray-700 flex-shrink-0">
            <Link href="/home">
              <img src="/icon.svg" alt="Logo" className="h-12 w-12" />
            </Link>
          </div>
          <div className="order-3 lg:order-2 w-full lg:w-auto mt-3 lg:mt-0 flex-grow">
            <NavLinks links={navItems} />
          </div>
          <div className="order-2 lg:order-3 mx-4 flex w-full lg:w-auto items-center justify-center mt-3 lg:mt-0">
            <SearchInput />
          </div>
          <div className="order-1 lg:order-4 flex items-center space-x-4 mt-3 lg:mt-0">
            <Profile />
            <Link
              href="#"
              className="flex flex-col items-center text-gray-700 hover:text-gray-900"
            >
              <AiOutlineHeart className="text-2xl" />
              <span className="text-sm">Wishlist</span>
            </Link>
            <Link
              href="/cart"
              className="flex flex-col items-center text-gray-700 hover:text-gray-900"
            >
              <AiOutlineShoppingCart className="text-2xl" />
              <span className="text-sm">Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
