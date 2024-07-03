interface ProductDetailsSectionProps {
  details: string[];
}

export default function ProductDetailsSection({
  details,
}: ProductDetailsSectionProps) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Product Details</h3>
      <ul className="mt-2 space-y-2">
        {details.map((detail, index) => (
          <li key={index}>{detail}</li>
        ))}
      </ul>
    </div>
  );
}
