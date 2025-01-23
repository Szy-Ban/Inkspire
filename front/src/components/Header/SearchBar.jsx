import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
        <div className="bg-white flex items-center justify-center px-4 py-3 rounded-full max-w-lg w-full shadow-card border-2 border-goldAccent">
            <input
                className="flex-grow text-primaryBlue placeholder-gray-500 bg-transparent focus:outline-none font-secondary text-lg px-4"
                placeholder="Search..."
            />
            <button className="ml-2">
                <FaSearch className="w-6 h-6 text-primaryBlue" />
            </button>
        </div>
    );
}