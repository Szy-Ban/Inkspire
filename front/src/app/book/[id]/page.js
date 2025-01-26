'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Button from '@/components/General/Button';

export default function BookDetails() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;

    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchBookDetails = async () => {
            try {
                const bookResponse = await fetch(`http://localhost:5000/api/books/${id}`);
                if (!bookResponse.ok) {
                    throw new Error('Failed to fetch book details');
                }
                const bookData = await bookResponse.json();
                setBook(bookData);

                const reviewsResponse = await fetch(`http://localhost:5000/api/reviews?bookId=${id}`);
                if (!reviewsResponse.ok) {
                    if (reviewsResponse.status === 404) {
                        setReviews([]);
                        setAverageRating(0);
                    } else {
                        throw new Error('Failed to fetch reviews');
                    }
                } else {
                    const { reviews, averageRating } = await reviewsResponse.json();
                    setReviews(reviews);
                    setAverageRating(averageRating);
                }

                setError(null);
            } catch (err) {
                console.error(err);
                setError('Failed to load book details or reviews.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) {
        return <p className="text-center mt-8 text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-8 text-red-500">{error}</p>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {book && (
                <>
                    <div className="bg-white p-6 rounded shadow-md flex flex-col md:flex-row items-center md:items-start mb-6">
                        <img
                            src={book.images[0] || '/placeholder.png'}
                            alt={book.title}
                            className="w-48 h-72 object-cover rounded-lg md:mr-6"
                        />
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
                            <p className="text-lg text-gray-700 mb-2">
                                Author: <span className="font-semibold">{book.author}</span>
                            </p>
                            <p className="text-gray-600 mb-4">{book.description}</p>
                            <p className="text-lg font-bold mb-4">${book.price.toFixed(2)}</p>
                            <Button variant="primary" size="medium" onClick={() => alert('Added to cart!')}>
                                Add to Cart
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        {reviews.length > 0 ? (
                            <div>
                                <p className="text-sm text-gray-700 mb-4">
                                    Average Rating: <span className="font-bold">{averageRating}/5</span>
                                </p>
                                <ul className="space-y-4">
                                    {reviews.map((review) => (
                                        <li key={review._id} className="border-t pt-4">
                                            <p className="font-semibold">{review.rating} / 5</p>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="text-center p-4 border rounded bg-gray-50">
                                <p className="text-gray-500">No reviews yet for this book.</p>
                                <Button variant="secondary" size="small" onClick={() => alert('Feature coming soon!')}>
                                    Add Your Review
                                </Button>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
