import Button from "@/components/general/Button";
import UserProfile from "@/components/Header/UserProfile";

export default function UserMenu() {
    const isLoggedIn = true;

    return (
        <div className="flex items-center space-x-6">
            {isLoggedIn ? (
                <UserProfile />
            ) : (
                <>
                    <Button variant="primary" size="medium">Login</Button>
                    <Button variant="secondary" size="medium">Register</Button>
                </>
            )}
        </div>
    );
}
