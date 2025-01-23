import { FaUserCircle } from "react-icons/fa";
import Button from "@/components/general/Button";

export default function UserProfile() {
    return (
        <div className="flex items-center space-x-4">
            <FaUserCircle className="w-12 h-12 text-primaryBlue" />
            <Button variant="primary" size="medium">Logout</Button>
        </div>
    );
}
