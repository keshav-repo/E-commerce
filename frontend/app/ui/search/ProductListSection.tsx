'use client';

import React from 'react';
import { ProductListSectionProps } from '@/app/lib/definitions';
import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';

const ProductListSection: React.FC<ProductListSectionProps> = ({
  products,
  total,
  pageSize,
  currentPage,
  totalPage,
  category,
  q
}) => {

  console.log(products);

  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPage) {
      if (q) {
        router.push(`search?page=${newPage}&size=${pageSize}&q=${q}`);
      } else {
        router.push(`search?page=${newPage}&size=${pageSize}&category=${category}`);
      }
    }
  };

  return (
    <section className="w-3/4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{total} items</h2>
        <div>
          <label htmlFor="sort" className="text-gray-700">
            Sort by:
          </label>
          <select id="sort" className="form-select ml-2">
            <option value="recommended">Recommended</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center mt-4 space-x-4">
        <button disabled={currentPage <= 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className='px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300'>
          Previous
        </button>
        <span className="flex items-center text-lg font-medium">
          Page {currentPage} of {totalPage}
        </span>
        <button disabled={currentPage >= totalPage}
          className="px-4 py-2 text-white bg-blue-500 rounded disabled:bg-gray-300"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductListSection;
