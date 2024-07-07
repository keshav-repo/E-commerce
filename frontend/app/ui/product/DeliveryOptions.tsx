'use client';

import { useState } from 'react';
import { DeliveryResponse } from '@/app/lib/definitions';

interface DeliveryOptionsProps {
  productId: number;
}

export default function DeliveryOptions({ productId }: DeliveryOptionsProps) {
  const [pincode, setPincode] = useState('');
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryResponse | null>(
    null,
  );

  const checkDelivery = async () => {
    const response = await fetch('/api/product/check-delivery', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ productId, pincode }),
    });

    const data: DeliveryResponse = await response.json();
    setDeliveryInfo(data);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Delivery Options</h3>
      <input
        type="text"
        placeholder="Enter pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        className="mt-2 w-full rounded border border-gray-300 p-2"
      />
      <button
        onClick={checkDelivery}
        className="mt-2 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Check Delivery
      </button>

      {deliveryInfo && (
        <div className="mt-4">
          {deliveryInfo.available ? (
            <div>
              <p>Delivery is available.</p>
              <p>
                Estimated Delivery Time: {deliveryInfo.estimatedDeliveryTime}{' '}
                days
              </p>
              <p>Delivery Charges: ₹{deliveryInfo.deliveryCharges}</p>
              <p>{deliveryInfo.notes}</p>
            </div>
          ) : (
            <p>Delivery is not available for the provided pincode.</p>
          )}
        </div>
      )}

      <ul className="mt-4 space-y-2">
        <li>100% Original Products</li>
        <li>Pay on delivery might be available</li>
        <li>Easy 14 days returns and exchanges</li>
      </ul>
    </div>
  );
}
