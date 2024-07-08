import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  image: string;
  brand: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
}

interface ProductListSectionProps {
  products: Product[];
}

const ProductListSection: React.FC<ProductListSectionProps> = ({
  products,
}) => {
  return (
    <section className="w-3/4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold"> 125812 items</h2>
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
