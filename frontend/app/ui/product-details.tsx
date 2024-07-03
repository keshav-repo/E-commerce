import Image from 'next/image';
import { Product } from '@/app/lib/definitions';
import SimilarProducts from './product/SimilarProducts';

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="mx-auto max-w-7xl bg-white p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {product.images.slice(0, 2).map((image, index) => (
              <div key={index} className="relative h-auto w-full">
                <Image
                  src={image}
                  layout="responsive"
                  width={500}
                  height={500}
                  objectFit="cover"
                  alt={`Product image ${index + 1}`}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {product.images.slice(2, 4).map((image, index) => (
              <div key={index} className="relative h-auto w-full">
                <Image
                  src={image}
                  layout="responsive"
                  width={500}
                  height={500}
                  objectFit="cover"
                  alt={`Product image ${index + 3}`}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {product.images.slice(4, 5).map((image, index) => (
              <div key={index} className="relative h-auto w-full">
                <Image
                  src={image}
                  layout="responsive"
                  width={500}
                  height={500}
                  objectFit="cover"
                  alt={`Product image ${index + 5}`}
                  className="rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
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

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Select Size</h3>
            <div className="mt-2 flex space-x-2">
              <button className="rounded border border-gray-300 px-4 py-2">
                S
              </button>
              <button className="rounded border border-gray-300 px-4 py-2">
                M
              </button>
              <button className="rounded border border-gray-300 px-4 py-2">
                L
              </button>
              <button className="rounded border border-gray-300 px-4 py-2">
                XL
              </button>
              <button className="rounded border border-gray-300 px-4 py-2">
                XXL
              </button>
            </div>
          </div>

          <div className="mt-6 flex space-x-4">
            <button className="rounded bg-pink-500 px-6 py-3 text-white">
              ADD TO BAG
            </button>
            <button className="rounded border border-gray-300 px-6 py-3">
              WISHLIST
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Delivery Options</h3>
            <input
              type="text"
              placeholder="Enter pincode"
              className="mt-2 w-full rounded border border-gray-300 p-2"
            />
            <ul className="mt-4 space-y-2">
              <li>100% Original Products</li>
              <li>Pay on delivery might be available</li>
              <li>Easy 14 days returns and exchanges</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Best Offers</h3>
            <p className="mt-2 text-red-500">Best Price: ₹439</p>
            <ul className="mt-2 space-y-2">
              <li>Applicable on: Orders above ₹749 (only on first purchase)</li>
              <li>Coupon code: MYNTRA200</li>
              <li>Coupon Discount: ₹160 off (check cart for final savings)</li>
            </ul>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">Product Details</h3>
            <ul className="mt-2 space-y-2">
              <li>Navy blue Tshirt for women</li>
              <li>Typography printed</li>
              <li>Longline length</li>
              <li>Round neck</li>
              <li>Short, drop shoulder sleeves</li>
              <li>Knitted cotton fabric</li>
              <li>Regular Fit</li>
              <li>The model (height 5'8) is wearing a size S</li>
              <li>100% Cotton</li>
              <li>Machine wash</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <SimilarProducts />
    </div>
  );
}
