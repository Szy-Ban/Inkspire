import Link from "next/link";
import Button from "@/app/_components/General/Button";
import UserProfile from "@/app/_components/Header/UserProfile";
import { useEffect, useState } from "react";

export default function UserMenu() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="flex items-center space-x-4">
            {isLoggedIn ? (
                <UserProfile onLogout={() => setIsLoggedIn(false)} />
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
