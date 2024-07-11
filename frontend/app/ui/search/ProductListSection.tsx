import React from 'react';
import { SearcProducthData } from '@/app/lib/definitions';
import ProductCard from './ProductCard';

interface ProductListSectionProps {
  products: SearcProducthData[];
  total: number;
}

const ProductListSection: React.FC<ProductListSectionProps> = ({
  products,
  total,
}) => {
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
    </section>
  );
};

export default ProductListSection;
