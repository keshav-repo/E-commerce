import ProductDetails from '@/app/ui/product/ProductDetails';
import { fetchProduct } from '@/app/lib/fetchProduct';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product page information',
  description: 'some product information',
};

export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const productData = await fetchProduct(params.productId);
  const product = productData.data;

  return (
    <main className="pt-16">
      <Suspense>
        <ProductDetails product={product} />
      </Suspense>
    </main>
  );
}
