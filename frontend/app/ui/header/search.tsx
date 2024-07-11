'use client';

import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { SeaechQuery } from '@/app/lib/definitions';

export default function SearchInput() {
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      var query: SeaechQuery = {
        name: inputValue
      }
      var queryString: string = await encodeURIComponent(JSON.stringify(query));
      event.preventDefault();
      router.push(`search?q=${queryString}`);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search"
        className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
      />
      <AiOutlineSearch className="absolute left-3 top-3 text-xl text-gray-500" />
    </div>
  );
}
