export default function DeliveryOptions() {
  return (
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
  );
}
