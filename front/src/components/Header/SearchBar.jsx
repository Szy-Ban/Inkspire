'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        router.push(`/search?title=${encodeURIComponent(searchQuery)}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="flex bg-white justify-between border border-goldAccent rounded-full px-4 py-2.5 shadow-sm">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className="flex-grow bg-transparent outline-none text-primaryBlue placeholder-gray-500 text-xl"
            />
            <button onClick={handleSearch} className="focus:outline-none">
                <FaSearch className="w-6 h-6 text-primaryBlue" />
            </button>
        </div>
    );
}
