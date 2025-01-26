import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartIcon() {
    const router = useRouter();
    const [cartCount, setCartCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);

        if (token) {
            const fetchCartCount = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/carts/cart', {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setCartCount(data.items.length || 0);
                    }
                } catch (error) {
                    console.error('Failed to fetch cart count:', error);
                }
            };

            fetchCartCount();

            const intervalId = setInterval(fetchCartCount, 10000);

            return () => clearInterval(intervalId);
        }
    }, []);

    if (!isLoggedIn) return null;

    return (
        <div
            className="relative cursor-pointer"
            onClick={() => router.push('/cart')}
        >
            <FaShoppingCart className="w-8 h-8 text-primaryBlue" />
            {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondaryBlue text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-card">
                    {cartCount}
                </span>
            )}
        </div>
    );
}
