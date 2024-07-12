import { ProductDetailsSectionProps } from '@/app/lib/definitions';
import React from 'react';

export default function ProductDetailsSection({ specifications }: ProductDetailsSectionProps) {
  const isEmpty = Object.keys(specifications).length === 0;
  if (isEmpty) {
    return null;
  }
  const entries = Object.entries(specifications);

  const pairs = [];
  for (let i = 0; i < entries.length; i += 2) {
    pairs.push(entries.slice(i, i + 2));
  }
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mt-4">Specifications</h3>
      <table className="mt-2 w-full border-collapse">
        <tbody>
          {pairs.map((pair, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {pair.map(([key, value], index) => (
                <React.Fragment key={index}>
                  <td className="py-2 px-4 font-semibold">{key}</td>
                  <td className="py-2 px-4">{value}</td>
                </React.Fragment>
              ))}
              {pair.length < 2 && (
                <>
                  <td className="py-2 px-4"></td>
                  <td className="py-2 px-4"></td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
