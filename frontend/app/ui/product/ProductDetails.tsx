import { Product } from '@/app/lib/definitions';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import DeliveryOptions from './DeliveryOptions';
import SimilarProducts from './SimilarProducts';
import AddToCartButtons from './AddToCartButtons';
import ProductDetailsSection from './ProductDetailsSection';

export default function ProductDetails({ product }: { product: Product }) {

  return (
    <div className="mx-auto max-w-7xl bg-white p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductImageGallery images={product.images} />
        <div>
          <ProductInfo product={product} />
          <AddToCartButtons />
          <DeliveryOptions productId={product.productId} />
          <ProductDetailsSection specifications={product.additionalInfo.specifications} />
        </div>
      </div>
      <SimilarProducts />
    </div>
  );
}
