export default function AddToCartButtons() {
  return (
    <div className="mt-6 flex space-x-4">
      <button className="rounded bg-pink-500 px-6 py-3 text-white">
        ADD TO BAG
      </button>
      <button className="rounded border border-gray-300 px-6 py-3">
        WISHLIST
      </button>
    </div>
  );
}
