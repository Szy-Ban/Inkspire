import { FaShoppingCart } from "react-icons/fa";

export default function CartIcon() {
    const cartCount = 4;

    return (
        <div className="relative">
            <FaShoppingCart className="w-8 h-8 text-primaryBlue" />
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondaryBlue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-card">
          {cartCount}
        </span>
            )}
        </div>
    );
}
