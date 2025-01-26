'use client';

import { useState, useEffect } from 'react';
import BookCard from '@/components/General/BookCard';
import Button from '@/components/General/Button';

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooksByCategory = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/books/categories/books');
            if (response.ok) {
                const data = await response.json();
                setCategories(data);
                setError(null);
            } else {
                setError('Failed to fetch books by category.');
            }
        } catch (err) {
            setError('An error occurred while fetching categories.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooksByCategory();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="p-6">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                {!loading &&
                    categories.map((category) => (
                        <section key={category._id} className="mb-12">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-bold">{category.name}</h2>
                                <Button
                                    variant="secondaryRev"
                                    size="medium"
                                    onClick={() => alert(`Discover more books in ${category.name}`)}
                                >
                                    Discover More
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                {category.books.slice(0, 5).map((book) => (
                                    <BookCard key={book._id} book={book} />
                                ))}
                            </div>
                        </section>
                    ))}
            </main>
        </div>
    );
}
