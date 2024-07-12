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
      </div>
    </div>
  );
}
