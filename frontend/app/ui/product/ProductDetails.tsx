'use client';

import { Product, ProductDetailsProps } from '@/app/lib/definitions';
import ProductImageGallery from './ProductImageGallery';
import ProductInfo from './ProductInfo';
import DeliveryOptions from './DeliveryOptions';
import SimilarProducts from './SimilarProducts';
import AddToCartButtons from './AddToCartButtons';
import ProductDetailsSection from './ProductDetailsSection';
import React from 'react';

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {

  const addToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const cartReq = {
        productId: product.productId,
        quantity: 1,
        operation: 'INC'
      }
      const response = await fetch(`/api/cart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartReq),
      });

      const data = await response.json();
      if (data.successCode === 'SUC07') {

      }
    } catch (err) {
      console.log('Error in updating cart item quantity'); s
    }
  }

  return (
    <div className="mx-auto max-w-7xl bg-white p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ProductImageGallery images={product.images} />
        <div>
          <ProductInfo product={product} />
          <AddToCartButtons addToCart={addToCart} />
          <DeliveryOptions productId={product.productId} />
          <ProductDetailsSection specifications={product.additionalInfo.specifications} />
        </div>
      </div>
      <SimilarProducts />
    </div>
  );
}

export default ProductDetails;
