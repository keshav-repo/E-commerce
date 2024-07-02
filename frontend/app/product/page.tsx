import Head from 'next/head';
import ProductDetails from '@/app/ui/product-details';
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
  const productData = await fetchProduct('3');
  const product = productData.data;

  return (
    <main className="p-6">
      <Suspense>
        <ProductDetails product={product} />
      </Suspense>
    </main>
  );
}
