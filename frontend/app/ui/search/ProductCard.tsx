import React from 'react';

interface Product {
  id: number;
  image: string;
  brand: string;
  name: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="rounded-lg bg-white px-4 py-1 shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="mb-4 h-64 w-full rounded-lg object-cover"
      />
      <h3 className="text-lg font-bold">{product.brand}</h3>
      <p className="text-gray-600">{product.name}</p>
      <p className="font-semibold text-red-500">Rs. {product.price}</p>
    </div>
  );
};

export default ProductCard;
