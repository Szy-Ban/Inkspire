'use client';

import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
    const [userReview, setUserReview] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [showPopup, setShowPopup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const fetchReviews = async () => {
        try {
            const reviewsResponse = await fetch(`http://localhost:5000/api/reviews?bookId=${id}`);

            if (!reviewsResponse.ok) throw new Error('Failed to fetch reviews');

            const { reviews, averageRating, userReview } = await reviewsResponse.json();
            setReviews(reviews);
            setAverageRating(averageRating);
            setUserReview(userReview || null);
        } catch (err) {
            console.error(err);
            alert('Failed to load reviews.');
        }
    };

    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    };

    useEffect(() => {
        checkLoginStatus();

        if (!id) return;

        const fetchBookDetails = async () => {
            try {
                const bookResponse = await fetch(`http://localhost:5000/api/books/${id}`);
                if (!bookResponse.ok) throw new Error('Failed to fetch book details');
                const bookData = await bookResponse.json();
                setBook(bookData);

                await fetchReviews();
            } catch (err) {
                console.error(err);
                setError('Failed to load book details or reviews.');
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    const handleAddToCart = async () => {
        if (!isLoggedIn) return;

        try {
            const response = await fetch('http://localhost:5000/api/carts/cart/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ bookId: id, quantity }),
            });

            if (!response.ok) throw new Error('Failed to add to cart');

            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 2000);
        } catch (err) {
            console.error(err);
            alert('Failed to add book to cart.');
        }
    };

    const handleQuantityChange = (type) => {
        setQuantity((prev) => {
            if (type === 'increment') return prev + 1;
            if (type === 'decrement' && prev > 1) return prev - 1;
            return prev;
        });
    };

    const formik = useFormik({
        initialValues: {
            rating: '',
            comment: '',
        },
        validationSchema: Yup.object({
            rating: Yup.number()
                .min(1, 'Rating must be at least 1')
                .max(5, 'Rating cannot exceed 5')
                .required('Rating is required'),
            comment: Yup.string()
                .min(5, 'Comment must be at least 5 characters')
                .max(200, 'Comment cannot exceed 200 characters')
                .required('Comment is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            if (!isLoggedIn) return;

            try {
                const response = await fetch(`http://localhost:5000/api/reviews`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify({ ...values, bookId: id }),
                });

                if (!response.ok) throw new Error('Failed to add review');
                await fetchReviews();
                resetForm();
            } catch (err) {
                alert('Failed to add review.');
            }
        },
    });

    if (loading) {
        return <p className="text-center mt-8 text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-8 text-red-500">{error}</p>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {showPopup && (
                <div className="fixed top-10 right-10 bg-green-500 text-white p-4 rounded shadow-lg z-50">
                    Book added to cart!
                </div>
            )}
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
                            <p className="text-gray-600 mb-4">Stock: {book.stock}</p>
                            <p className="text-lg font-bold mb-4">${book.price.toFixed(2)}</p>
                            <div className="flex items-center mb-4">
                                <Button variant="secondary" size="small" onClick={() => handleQuantityChange('decrement')}>
                                    -
                                </Button>
                                <p className="mx-4">{quantity}</p>
                                <Button variant="secondary" size="small" onClick={() => handleQuantityChange('increment')}>
                                    +
                                </Button>
                            </div>
                            <Button
                                variant="primary"
                                size="medium"
                                onClick={handleAddToCart}
                                disabled={!isLoggedIn}
                            >
                                {isLoggedIn ? 'Add to Cart' : 'Log in to Add to Cart'}
                            </Button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Reviews</h2>
                        {isLoggedIn ? (
                            userReview ? (
                                <div className="mb-4 p-4 border rounded bg-gray-50">
                                    <h3 className="font-semibold text-lg mb-2">Your Review</h3>
                                    <p className="text-sm">Rating: {userReview.rating} / 5</p>
                                    <p className="text-sm mb-3">{userReview.comment}</p>
                                    <Button variant="danger" size="small">
                                        Delete Your Review
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={formik.handleSubmit} className="mb-4">
                                    <h3 className="font-semibold text-lg mb-2">Add Your Review</h3>
                                    <input
                                        type="number"
                                        max={5}
                                        min={1}
                                        {...formik.getFieldProps('rating')}
                                        className="border rounded w-full p-2 mb-2"
                                        placeholder="Rating (1-5)"
                                    />
                                    {formik.touched.rating && formik.errors.rating && (
                                        <p className="text-red-500 text-sm">{formik.errors.rating}</p>
                                    )}
                                    <textarea
                                        {...formik.getFieldProps('comment')}
                                        className="border rounded w-full p-2 mb-2"
                                        placeholder="Comment"
                                    ></textarea>
                                    {formik.touched.comment && formik.errors.comment && (
                                        <p className="text-red-500 text-sm">{formik.errors.comment}</p>
                                    )}
                                    <Button type="submit" variant="secondary" size="small">
                                        Submit Review
                                    </Button>
                                </form>
                            )
                        ) : (
                            <p className="text-gray-500">Log in to add or edit reviews.</p>
                        )}
                        {reviews.length > 0 ? (
                            <div>
                                <p className="text-sm text-gray-700 mb-4">
                                    Average Rating: <span className="font-bold">{averageRating}/5</span>
                                </p>
                                <ul className="space-y-4">
                                    {reviews.map((review) => (
                                        <li key={review._id} className="border-t pt-4">
                                            <p className="font-semibold">
                                                {review.userId?.name || 'Anonymous'} {review.userId?.surname || ''}
                                            </p>
                                            <p className="text-sm text-gray-500">{review.rating} / 5</p>
                                            <p className="text-gray-600">{review.comment}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="text-center p-4 border rounded bg-gray-50">
                                <p className="text-gray-500">No reviews yet for this book.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
