import Image from 'next/image';

interface SimilarProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
}

const similarProducts: SimilarProduct[] = [
  {
    id: 1,
    name: 'STATUS MANTRA',
    price: 599,
    originalPrice: 999,
    discount: 400,
    image:
      'https://ecomstore-dev-data.s3.us-east-2.amazonaws.com/product/img1_product_2.jpg',
  },
  {
    id: 1,
    name: 'STATUS MANTRA',
    price: 599,
    originalPrice: 999,
    discount: 400,
    image:
      'https://ecomstore-dev-data.s3.us-east-2.amazonaws.com/product/img3_product_2.jpg',
  },
];

export default function SimilarProducts() {
  return (
    <div className="mx-auto mt-6 max-w-7xl bg-white p-6">
      <h3 className="text-xl font-bold">SIMILAR PRODUCTS</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {similarProducts.map((product) => (
          <div key={product.id} className="border border-gray-300 bg-white p-4">
            <Image
              src={product.image}
              width={500}
              height={300}
              objectFit="cover"
              alt="Product Image"
              className="h-48 w-full object-cover"
            />
            <h4 className="mt-2 font-semibold">{product.name}</h4>
            <p className="text-gray-600">Women Typography Printed...</p>
            <div className="mt-2 flex items-center">
              <span className="text-lg font-bold text-red-500">
                ₹{product.price}
              </span>
              <span className="ml-2 text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
              <span className="ml-2 text-green-500">
                (₹{product.discount} OFF)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
