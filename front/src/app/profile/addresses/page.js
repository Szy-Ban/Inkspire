'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/General/Button';
import UserPanel from '@/components/General/UserPanel';

export default function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editAddress, setEditAddress] = useState({ street: '', city: '', country: '', zipCode: '' });
    const router = useRouter();

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

    useEffect(() => {
        fetchAddresses();
    }, []);

    const formik = useFormik({
        initialValues: { street: '', city: '', country: '', zipCode: '' },
        validationSchema: Yup.object({
            street: Yup.string().required('Street is required').min(3, 'Street must be at least 3 characters'),
            city: Yup.string().required('City is required').min(3, 'City must be at least 3 characters'),
            country: Yup.string().required('Country is required').min(3, 'Country must be at least 3 characters'),
            zipCode: Yup.string()
                .required('Zip Code is required')
                .length(5, 'Zip Code must be exactly 5 digits')
                .matches(/^[0-9]+$/, 'Zip Code must only contain digits'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await fetch('http://localhost:5000/users/addresses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    resetForm();
                    fetchAddresses();
                } else {
                    console.error('Failed to add address.');
                }
            } catch (error) {
                console.error('Error adding address:', error);
            }
        },
    });

    const handleEditAddressChange = (e) => {
        const { name, value } = e.target;
        setEditAddress({ ...editAddress, [name]: value });
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
                fetchAddresses();
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
                fetchAddresses();
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
                                    <Button variant="primary" size="small" onClick={() => handleEditAddress(index)}>
                                        Save
                                    </Button>
                                    <Button variant="secondary" size="small" onClick={() => setEditIndex(null)}>
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
                                        <Button variant="secondary" size="small" onClick={() => handleRemoveAddress(index)}>
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
            <UserPanel />
            <div className="w-full md:w-3/4 p-6">
                <div className="p-6 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">Addresses</h2>
                    {addresses.length > 0 ? renderAddresses() : <p>No addresses found.</p>}
                    <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-4">Add New Address</h3>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="space-y-4">
                                {['street', 'city', 'country', 'zipCode'].map((field) => (
                                    <div key={field}>
                                        <input
                                            type="text"
                                            name={field}
                                            value={formik.values[field]}
                                            onChange={formik.handleChange}
                                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                            className={`w-full border rounded px-4 py-2 ${
                                                formik.touched[field] && formik.errors[field]
                                                    ? 'border-red-500'
                                                    : 'border-gray-300'
                                            }`}
                                        />
                                        {formik.touched[field] && formik.errors[field] && (
                                            <p className="text-red-500 text-sm">{formik.errors[field]}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4">
                                <Button variant="primary" size="medium" type="submit">
                                    Add Address
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
