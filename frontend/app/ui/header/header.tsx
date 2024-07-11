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
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-700">
            <Link href="/home">
              <img src="/icon.svg" alt="Logo" className="h-12 w-12" />
            </Link>
          </div>
          <NavLinks links={navItems} />
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
