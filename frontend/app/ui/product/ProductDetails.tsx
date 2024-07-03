import { Product } from '@/app/lib/definitions';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import SizeSelection from './SizeSelection';
import DeliveryOptions from './DeliveryOptions';
import BestOffers from './BestOffers';
import SimilarProducts from './SimilarProducts';
import AddToCartButtons from './AddToCartButtons';
import ProductDetailsSection from './ProductDetailsSection';

const productDetails = [
  'Navy blue Tshirt for women',
  'Typography printed',
  'Longline length',
  'Round neck',
  'Short, drop shoulder sleeves',
  'Knitted cotton fabric',
  'Regular Fit',
  "The model (height 5'8) is wearing a size S",
  '100% Cotton',
  'Machine wash',
];

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <div className="mx-auto max-w-7xl bg-white p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductImageGallery images={product.images} />
        <div>
          <ProductInfo product={product} />
          <SizeSelection />
          <AddToCartButtons />
          <DeliveryOptions productId={product.productId} />
          <BestOffers />
          <ProductDetailsSection details={productDetails} />
        </div>
      </div>
      <SimilarProducts />
    </div>
  );
}
