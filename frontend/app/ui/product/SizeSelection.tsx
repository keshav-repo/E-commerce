export default function SizeSelection() {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Select Size</h3>
      <div className="mt-2 flex space-x-2">
        <button className="rounded border border-gray-300 px-4 py-2">S</button>
        <button className="rounded border border-gray-300 px-4 py-2">M</button>
        <button className="rounded border border-gray-300 px-4 py-2">L</button>
        <button className="rounded border border-gray-300 px-4 py-2">XL</button>
        <button className="rounded border border-gray-300 px-4 py-2">
          XXL
        </button>
      </div>
    </div>
  );
}
