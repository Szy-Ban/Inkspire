'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/General/Button';
import UserPanel from '@/components/General/UserPanel';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', surname: '', email: '' });
    const [errors, setErrors] = useState({});
    const router = useRouter();

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

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required.';
        if (!formData.surname.trim()) newErrors.surname = 'Surname is required.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSave = async () => {
        if (!validateForm()) return;

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
                        {['name', 'surname', 'email'].map((field) => (
                            <div key={field}>
                                <input
                                    type={field === 'email' ? 'email' : 'text'}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleInputChange}
                                    className={`w-full border rounded px-4 py-2 ${
                                        errors[field] ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                />
                                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
                            </div>
                        ))}
                        <div className="space-x-4">
                            <Button variant="primary" size="medium" onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="secondary" size="medium" onClick={() => setIsEditing(false)}>
                                Cancel
                            </Button>
                        </div>
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
            <UserPanel />
            <div className="w-full md:w-3/4 p-6">{renderContent()}</div>
        </div>
    );
}
