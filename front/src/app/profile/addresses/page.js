'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Button from '@/components/General/Button';

export default function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({ street: '', city: '', country: '', zipCode: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [editAddress, setEditAddress] = useState({ street: '', city: '', country: '', zipCode: '' });
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/addresses', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const addressData = await response.json();
                    setAddresses(addressData);
                } else {
                    console.error('Failed to fetch addresses.');
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchAddresses();
    }, [router]);

    const handleNewAddressChange = (e) => {
        const { name, value } = e.target;
        setNewAddress({ ...newAddress, [name]: value });
    };

    const handleEditAddressChange = (e) => {
        const { name, value } = e.target;
        setEditAddress({ ...editAddress, [name]: value });
    };

    const handleAddAddress = async () => {
        try {
            const response = await fetch('http://localhost:5000/users/addresses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(newAddress),
            });

            if (response.ok) {
                const addedAddress = await response.json();
                setAddresses([...addresses, addedAddress]);
                setNewAddress({ street: '', city: '', country: '', zipCode: '' });
            } else {
                console.error('Failed to add address.');
            }
        } catch (error) {
            console.error('Error adding address:', error);
        }
    };

    const handleEditAddress = async (index) => {
        const addressId = addresses[index]._id;

        try {
            const response = await fetch(`http://localhost:5000/users/addresses/${addressId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(editAddress),
            });

            if (response.ok) {
                const updatedAddress = await response.json();
                const updatedAddresses = [...addresses];
                updatedAddresses[index] = updatedAddress.address;
                setAddresses(updatedAddresses);
                setEditIndex(null);
                setEditAddress({ street: '', city: '', country: '', zipCode: '' });
            } else {
                console.error('Failed to update address.');
            }
        } catch (error) {
            console.error('Error updating address:', error);
        }
    };

    const handleRemoveAddress = async (index) => {
        const addressId = addresses[index]._id;

        try {
            const response = await fetch(`http://localhost:5000/users/addresses/${addressId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                setAddresses((prev) => prev.filter((_, i) => i !== index));
            } else {
                console.error('Failed to remove address.');
            }
        } catch (error) {
            console.error('Error removing address:', error);
        }
    };

    const renderAddresses = () => {
        return (
            <ul className="space-y-6">
                {addresses.map((address, index) => (
                    <li key={index} className="border-b pb-4">
                        {editIndex === index ? (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="street"
                                    value={editAddress.street}
                                    onChange={handleEditAddressChange}
                                    placeholder="Street"
                                    className="w-full border rounded px-4 py-2"
                                />
                                <input
                                    type="text"
                                    name="city"
                                    value={editAddress.city}
                                    onChange={handleEditAddressChange}
                                    placeholder="City"
                                    className="w-full border rounded px-4 py-2"
                                />
                                <input
                                    type="text"
                                    name="country"
                                    value={editAddress.country}
                                    onChange={handleEditAddressChange}
                                    placeholder="Country"
                                    className="w-full border rounded px-4 py-2"
                                />
                                <input
                                    type="text"
                                    name="zipCode"
                                    value={editAddress.zipCode}
                                    onChange={handleEditAddressChange}
                                    placeholder="Zip Code"
                                    className="w-full border rounded px-4 py-2"
                                />
                                <div className="flex space-x-4 mt-4">
                                    <Button
                                        variant="primary"
                                        size="small"
                                        onClick={() => handleEditAddress(index)}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        onClick={() => setEditIndex(null)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p>
                                    <strong>Street:</strong> {address.street}
                                </p>
                                <p>
                                    <strong>City:</strong> {address.city}
                                </p>
                                <p>
                                    <strong>Country:</strong> {address.country}
                                </p>
                                <p>
                                    <strong>Zip Code:</strong> {address.zipCode}
                                </p>
                                <div className="flex space-x-4 mt-4">
                                    <Button
                                        variant="primary"
                                        size="small"
                                        onClick={() => {
                                            setEditIndex(index);
                                            setEditAddress(address);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    {addresses.length > 1 && (
                                        <Button
                                            variant="secondary"
                                            size="small"
                                            onClick={() => handleRemoveAddress(index)}
                                        >
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            <div className="w-full md:w-1/4 bg-white p-6 shadow">
                <h2 className="text-lg font-semibold mb-6">User Panel</h2>
                <ul className="space-y-4">
                    <li>
                        <button
                            className={`w-full text-left px-4 py-2 rounded ${
                                pathname === '/profile' ? 'bg-primaryBlue text-white' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => router.push('/profile')}
                        >
                            Profile
                        </button>
                    </li>
                    <li>
                        <button
                            className={`w-full text-left px-4 py-2 rounded ${
                                pathname === '/profile/addresses' ? 'bg-primaryBlue text-white' : 'hover:bg-gray-100'
                            }`}
                            onClick={() => router.push('/profile/addresses')}
                        >
                            Addresses
                        </button>
                    </li>
                </ul>
            </div>
            <div className="w-full md:w-3/4 p-6">
                <div className="p-6 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Addresses</h2>
                    {addresses.length > 0 ? (
                        renderAddresses()
                    ) : (
                        <p>No addresses found.</p>
                    )}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="street"
                                value={newAddress.street}
                                onChange={handleNewAddressChange}
                                placeholder="Street"
                                className="w-full border rounded px-4 py-2"
                            />
                            <input
                                type="text"
                                name="city"
                                value={newAddress.city}
                                onChange={handleNewAddressChange}
                                placeholder="City"
                                className="w-full border rounded px-4 py-2"
                            />
                            <input
                                type="text"
                                name="country"
                                value={newAddress.country}
                                onChange={handleNewAddressChange}
                                placeholder="Country"
                                className="w-full border rounded px-4 py-2"
                            />
                            <input
                                type="text"
                                name="zipCode"
                                value={newAddress.zipCode}
                                onChange={handleNewAddressChange}
                                placeholder="Zip Code"
                                className="w-full border rounded px-4 py-2"
                            />
                        </div>
                        <div className="mt-4">
                            <Button variant="primary" size="medium" onClick={handleAddAddress}>
                                Add Address
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
