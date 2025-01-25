import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function UserProfile({ onLogout }) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch("http://localhost:5000/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.ok) {
                localStorage.removeItem("token");
                onLogout();
                router.push("/");
            } else {
                console.error("Failed to log out.");
            }
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div className="flex items-center space-x-4">
            <button onClick={() => router.push("/profile")} className="focus:outline-none">
                <FaUserCircle className="w-12 h-12 text-primaryBlue cursor-pointer" />
            </button>
            <button
                className="bg-gradient-to-r from-primaryBlue to-secondaryBlue text-white py-3 px-6 rounded-button shadow-button hover:opacity-90 transition-opacity"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}
