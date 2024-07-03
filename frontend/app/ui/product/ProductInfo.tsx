import { Product } from '@/app/lib/definitions';

export default function ProductInfo({ product }: { product: Product }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-xl text-gray-600">{product.description}</p>
      <div className="mt-4 flex items-center">
        <span className="text-2xl font-bold text-red-500">
          ₹{product.price}
        </span>
        <span className="ml-2 text-gray-500 line-through">₹999</span>
        <span className="ml-2 text-green-500">(₹400 OFF)</span>
      </div>
      <p className="mt-4">inclusive of all taxes</p>
    </div>
  );
}
