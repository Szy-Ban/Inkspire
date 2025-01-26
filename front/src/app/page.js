'use client';

import { useState, useEffect } from 'react';
import BookCard from '@/components/General/BookCard';

export default function Home() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/books');
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
                setError(null);
            } else {
                setError('Failed to fetch books.');
            }
        } catch (err) {
            setError('An error occurred while fetching books.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen">
            <main className="p-4">
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {books.map((book) => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            </main>
        </div>
    );
}
