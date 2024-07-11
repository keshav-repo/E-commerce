import React from 'react';
import { ProductCategoriesProps } from '@/app/lib/definitions';
import Link from 'next/link';

const ProductCategories: React.FC<ProductCategoriesProps> = ({ categories }) => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link key={index} href={`/search?category=${category.title}`}>
              <div key={index} className="bg-white shadow-md rounded-md overflow-hidden">
                <img src={category.imgSrc} alt={category.title} className="w-full h-40 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">
                    {category.title.length > 15 ? `${category.title.slice(0, 15)}...` : category.title}
                  </h3>
                  <button className="mt-2 bg-black text-white px-4 py-2 rounded">Shop Now</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
