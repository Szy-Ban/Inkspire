import Button from "@/components/general/Button";
import UserProfile from "@/components/Header/UserProfile";
import Link from "next/link";

export default function UserMenu() {
    const isLoggedIn = true;

    return (
        <div className="flex items-center space-x-4">
            {isLoggedIn ? (
                <UserProfile />
            ) : (
                <>
                    <Link href="/login">
                        <Button variant="primary" size="medium">Login</Button>
                    </Link>
                    <Link href='/register'>
                        <Button variant="secondary" size="medium">Register</Button>
                    </Link>
                </>
            )}
        </div>
    );
}
