'use client';

import Link from 'next/link';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/lib/authContext';

export default function Profile() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="relative">
      <button
        onClick={togglePopup}
        className="flex flex-col items-center text-gray-700 hover:text-gray-900"
      >
        <FaUser className="text-2xl" />
        <span className="text-sm">{user ? 'Profile' : 'Login'}</span>
      </button>
      {isPopupVisible && (
        <div className="absolute right-0 z-10 mt-2 w-64 border border-gray-300 bg-white shadow-lg">
          <div className="p-4">
            {user ? (
              <>
                <p className="mb-4">Hello, {user}</p>
                <button
                  className="mt-2 w-full rounded bg-red-500 py-2 text-white hover:bg-red-600"
                  onClick={() => {
                    logout();
                    setIsPopupVisible(false);
                    router.push('/');
                  }}
                >
                  LOGOUT
                </button>
                <ul className="mt-4 text-gray-700">
                  <li className="py-1 hover:bg-gray-100">
                    <Link href="/orders">Orders</Link>
                  </li>
                  <li className="py-1 hover:bg-gray-100">
                    <Link href="#">Wishlist</Link>
                  </li>
                  <li className="py-1 hover:bg-gray-100">
                    <Link href="#">Contact Us</Link>
                  </li>
                  <li className="py-1 hover:bg-gray-100">
                    <Link href="#">Saved Addresses</Link>
                  </li>
                </ul>
              </>
            ) : (
              <button
                className="mt-2 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
                onClick={(e) => router.push('/login')}
              >
                LOGIN / SIGNUP
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
