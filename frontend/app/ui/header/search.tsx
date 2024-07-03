import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

export default function SearchInput() {
  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        placeholder="Search"
        className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
      />
      <AiOutlineSearch className="absolute left-3 top-3 text-xl text-gray-500" />
    </div>
  );
}
