'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Button from '@/components/General/Button';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', surname: '', email: '' });
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/users/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);
                    setFormData({
                        name: userData.name,
                        surname: userData.surname,
                        email: userData.email,
                    });
                } else {
                    router.push('/login');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserProfile();
    }, [router]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch('http://localhost:5000/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUser(updatedUser.user);
                setIsEditing(false);
            } else {
                console.error('Failed to update user profile.');
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const renderContent = () => {
        return (
            <div className="p-6 bg-white rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                {isEditing ? (
                    <div className="space-y-4 mb-6">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border rounded px-4 py-2"
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleInputChange}
                            className="w-full border rounded px-4 py-2"
                            placeholder="Surname"
                        />
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full border rounded px-4 py-2"
                            placeholder="Email"
                        />
                        <Button variant="primary" size="medium" onClick={handleSave}>
                            Save
                        </Button>
                        <Button variant="secondary" size="medium" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-4 mb-6">
                        <p>
                            <strong>Name:</strong> {user?.name}
                        </p>
                        <p>
                            <strong>Surname:</strong> {user?.surname}
                        </p>
                        <p>
                            <strong>Email:</strong> {user?.email}
                        </p>
                        <Button variant="primary" size="medium" onClick={() => setIsEditing(true)}>
                            Edit
                        </Button>
                    </div>
                )}
            </div>
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
            <div className="w-full md:w-3/4 p-6">{renderContent()}</div>
        </div>
    );
}
