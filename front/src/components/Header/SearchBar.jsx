import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
    return (
        <div className="flex bg-white justify-between border border-goldAccent rounded-full px-4 py-2.5 shadow-sm">
            <input
                type="text"
                placeholder="Search..."
                className="flex-grow bg-transparent outline-none text-primaryBlue placeholder-gray-500 text-xl"
            />
            <button className="">
                <FaSearch className="w-6 h-6 text-primaryBlue" />
            </button>
        </div>
    );
}
