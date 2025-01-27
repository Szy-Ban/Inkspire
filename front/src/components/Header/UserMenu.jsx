import Link from "next/link";
import Button from "@/components/General/Button";
import UserProfile from "@/components/Header/UserProfile";
import CartIcon from "@/components/Header/CartIcon";
import { useEffect, useState } from "react";

export default function UserMenu() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);

        const handleStorageChange = () => {
            const updatedToken = localStorage.getItem("token");
            setIsLoggedIn(!!updatedToken);
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <div className="flex items-center space-x-4">
            {isLoggedIn ? (
                <>
                    <CartIcon />
                    <UserProfile onLogout={() => setIsLoggedIn(false)} />
                </>
            ) : (
                <>
                    <Link href="/login">
                        <Button variant="primary" size="medium">Login</Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="secondary" size="medium">Register</Button>
                    </Link>
                </>
            )}
        </div>
    );
}
