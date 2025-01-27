'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/General/Button';
import UserPanel from '@/components/General/UserPanel';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/orders/user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const ordersData = await response.json();

                const ordersWithTitles = await Promise.all(
                    ordersData.map(async (order) => {
                        const itemsWithTitles = await Promise.all(
                            order.items.map(async (item) => {
                                const bookResponse = await fetch(`http://localhost:5000/api/books/${item.bookId}`, {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                });
                                const bookData = await bookResponse.json();
                                return { ...item, title: bookData.title };
                            })
                        );
                        return { ...order, items: itemsWithTitles };
                    })
                );

                setOrders(ordersWithTitles);
                setError(null);
            } else {
                console.error('Failed to fetch orders.');
                setOrders([]);
                setError('Failed to fetch orders.');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            setOrders([]);
            setError('Error fetching orders. Please try again later.');
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${orderId}/cancel`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                fetchOrders();
            } else {
                console.error('Failed to cancel order.');
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
        }
    };

    const renderOrders = () => {
        if (error) {
            return <p className="text-red-500">{error}</p>;
        }

        if (orders.length === 0) {
            return <p>No orders found.</p>;
        }

        return (
            <ul className="space-y-6">
                {orders.map((order) => (
                    <li
                        key={order._id}
                        className={`border rounded p-4 ${
                            order.status === 'cancelled' ? 'bg-gray-200 text-gray-500' : 'bg-white'
                        }`}
                    >
                        <div className="space-y-2">
                            <p>
                                <strong>Order ID:</strong> {order._id}
                            </p>
                            <p>
                                <strong>Status:</strong> {order.status}
                            </p>
                            <p>
                                <strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}
                            </p>
                            <p>
                                <strong>Shipping Address:</strong> {`${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.country}, ${order.shippingAddress.zipCode}`}
                            </p>
                            <p>
                                <strong>Items:</strong>
                            </p>
                            <ul className="ml-4 list-disc">
                                {order.items.map((item) => (
                                    <li key={item.bookId}>
                                        Book (byId): {item.bookId} - {item.quantity} × ${item.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                            {order.status !== 'cancelled' && (
                                <div className="mt-4">
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        onClick={() => handleCancelOrder(order._id)}
                                    >
                                        Cancel Order
                                    </Button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <UserPanel />
            <div className="w-full md:w-3/4 p-6">
                <div className="p-6 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Orders</h2>
                    {renderOrders()}
                </div>
            </div>
        </div>
    );
}
