import { AddToCartProp } from "@/app/lib/definitions";

const AddToCartButtons: React.FC<AddToCartProp> = ({ addToCart, addToWishlist }) => {

  return (
    <div className="mt-6 flex space-x-4">
      <button className="rounded bg-blue-500 px-6 py-3 text-white" onClick={addToCart}>
        ADD TO CART
      </button>
      <button className="rounded bg-slate-500 px-6 py-3 text-white" onClick={addToWishlist}>
        WISHLIST
      </button>
    </div>
  );
}

export default AddToCartButtons;
