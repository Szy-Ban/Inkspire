'use client';

import { useState, useEffect } from 'react';

export default function CategoriesMenu() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    setError('Failed to fetch categories.');
                }
            } catch (err) {
                setError('An error occurred while fetching categories.');
            }
        };

        fetchCategories();
    }, []);

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <nav className="bg-white">
            <ul className="flex flex-wrap justify-center border-t border-gray-300 py-4">
                {categories.map((category) => (
                    <li
                        key={category._id}
                        className="px-4 py-2 text-primaryBlue font-secondary text-md lg:text-lg hover:underline hover:text-secondaryBlue cursor-pointer border-gray-300 lg:border-r lg:last:border-none"
                    >
                        {category.name}
                    </li>
                ))}
            </ul>
        </nav>
    );
}
