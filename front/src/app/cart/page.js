'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/General/Button';
import { useRouter } from 'next/navigation';

export default function Cart() {
    const router = useRouter();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/carts/cart', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });

                if (!response.ok) {
                    if (response.status === 404) {
                        setCart({ items: [] });
                    } else {
                        throw new Error('Failed to fetch cart');
                    }
                } else {
                    const data = await response.json();
                    setCart(data);
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load cart.');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const handleRemoveItem = async (bookId) => {
        try {
            const response = await fetch('http://localhost:5000/api/carts/cart/items', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ bookId }),
            });

            if (!response.ok) throw new Error('Failed to remove item');
            const updatedCart = await response.json();
            setCart(updatedCart.cart);
        } catch (err) {
            alert('Failed to remove item.');
        }
    };

    const handleClearCart = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/carts/cart', {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });

            if (!response.ok) throw new Error('Failed to clear cart');
            const updatedCart = await response.json();
            setCart(updatedCart.cart);
        } catch (err) {
            alert('Failed to clear cart.');
        }
    };

    if (loading) {
        return <p className="text-center mt-8 text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-center mt-8 text-red-500">{error}</p>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {cart.items.length > 0 ? (
                <>
                    <ul className="mb-6">
                        {cart.items.map((item) => (
                            <li
                                key={item.bookId._id}
                                className="flex justify-between items-center p-4 bg-white shadow rounded mb-4"
                            >
                                <div className="flex items-center">
                                    <img
                                        src={item.bookId.images?.[0]}
                                        alt={item.bookId.title || 'Book Image'}
                                        className="w-16 h-24 object-cover mr-4 rounded"
                                    />
                                    <div>
                                        <p className="text-lg font-semibold">{item.bookId.title || 'Unknown Title'}</p>
                                        <p className="text-gray-600">
                                            Price: ${item.price} x {item.quantity}
                                        </p>
                                    </div>
                                </div>
                                <Button
                                    variant="danger"
                                    size="small"
                                    onClick={() => handleRemoveItem(item.bookId._id)}
                                >
                                    Remove
                                </Button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center">
                        <p className="text-lg font-bold">
                            Total Price: $
                            {cart.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                        </p>
                        <div className="space-x-4">
                            <Button variant="secondary" size="small" onClick={handleClearCart}>
                                Clear Cart
                            </Button>
                            <Button
                                variant="primary"
                                size="small"
                                onClick={() => alert('Order placed!')}
                            >
                                Place Order
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center p-6 bg-white shadow rounded">
                    <p className="text-gray-600">Your cart is empty.</p>
                    <Button variant="primary" size="medium" onClick={() => router.push('/')}>
                        Go Shopping
                    </Button>
                </div>
            )}
        </div>
    );
}
