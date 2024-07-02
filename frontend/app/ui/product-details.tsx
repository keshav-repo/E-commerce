import Image from 'next/image';
import { Product } from '@/app/lib/definitions';

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="relative mb-4 h-64 w-full md:mb-0 md:h-auto md:w-1/3">
          <Image
            src={product.images[0]}
            layout="fill"
            objectFit="cover"
            alt={`Product image`}
            className="rounded-lg"
          />
        </div>
        <div className="flex-1 md:ml-6">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="mb-2 text-lg text-gray-700">{product.description}</p>
          <p className="mb-2 text-xl font-semibold text-gray-800">
            Price: ${product.price}
          </p>
          <p className="mb-2 text-gray-600">Category: {product.category}</p>
          <p className="mb-4 text-gray-600">Company: {product.company}</p>
          <h2 className="mb-2 text-2xl font-semibold text-gray-900">
            Specifications
          </h2>
          <ul className="mb-6 list-inside list-disc">
            {Object.entries(product.additionalInfo.specifications).map(
              ([key, value]) => (
                <li key={key} className="text-gray-700">
                  <strong>{key}:</strong> {value}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
      {/* <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {product.images.slice(1).map((image: string, index: number) => (
          <div key={index} className="relative h-64 w-full">
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt={`Product image ${index + 1}`}
              className="rounded-lg"
            />
          </div>
        ))}
      </div> */}
    </div>
  );
}
