'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirmPassword: '',
            street: '',
            city: '',
            country: '',
            zipCode: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Name is required')
                .min(3, 'Name must be at least 3 characters'),
            surname: Yup.string()
                .required('Surname is required')
                .min(3, 'Surname must be at least 3 characters'),
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(8, 'Password must be at least 8 characters'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Please confirm your password'),
            street: Yup.string()
                .required('Street is required')
                .min(3, 'Street must be at least 3 characters'),
            city: Yup.string()
                .required('City is required')
                .min(3, 'City must be at least 3 characters'),
            country: Yup.string()
                .required('Country is required')
                .min(3, 'Country must be at least 3 characters'),
            zipCode: Yup.string()
                .required('Zip Code is required')
                .length(5, 'Zip Code must be exactly 5 digits')
                .matches(/^[0-9]+$/, 'Zip Code must only contain digits'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await fetch('http://localhost:5000/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: values.name,
                        surname: values.surname,
                        email: values.email,
                        password: values.password,
                        addresses: [
                            {
                                street: values.street,
                                city: values.city,
                                country: values.country,
                                zipCode: values.zipCode,
                            },
                        ],
                    }),
                });

                if (response.ok) {
                    window.location.href = '/login';
                } else {
                    const errorData = await response.json();
                    setErrors({
                        serverError: errorData.error || 'Registration failed. Please try again.',
                    });
                }
            } catch (error) {
                setErrors({ serverError: 'An error occurred. Please check your network connection.' });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form
                className="bg-white p-10 rounded-lg shadow-lg w-full max-w-4xl"
                onSubmit={formik.handleSubmit}
            >
                <h1 className="text-3xl font-semibold text-primaryBlue mb-8">Register</h1>
                {formik.errors.serverError && (
                    <p className="text-red-500 text-sm mb-4">{formik.errors.serverError}</p>
                )}

                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-lg font-bold text-primaryBlue mb-4">Personal Information</h2>
                        {['name', 'surname', 'email', 'password', 'confirmPassword'].map((field) => (
                            <div className="mb-6" key={field}>
                                <label
                                    htmlFor={field}
                                    className="block text-gray-700 font-medium mb-2 capitalize"
                                >
                                    {field === 'confirmPassword'
                                        ? 'Confirm Password'
                                        : field.replace(/([A-Z])/g, ' $1')}
                                </label>
                                <div className="relative">
                                    <input
                                        id={field}
                                        type={
                                            field === 'password'
                                                ? showPassword
                                                    ? 'text'
                                                    : 'password'
                                                : field === 'confirmPassword'
                                                    ? showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                    : 'text'
                                        }
                                        {...formik.getFieldProps(field)}
                                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring ${
                                            formik.touched[field] && formik.errors[field]
                                                ? 'border-red-500'
                                                : 'border-gray-300'
                                        }`}
                                    />
                                    {(field === 'password' || field === 'confirmPassword') && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                field === 'password'
                                                    ? setShowPassword(!showPassword)
                                                    : setShowConfirmPassword(!showConfirmPassword)
                                            }
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primaryBlue"
                                        >
                                            {field === 'password' && showPassword ? (
                                                <FaEyeSlash />
                                            ) : field === 'confirmPassword' && showConfirmPassword ? (
                                                <FaEyeSlash />
                                            ) : (
                                                <FaEye />
                                            )}
                                        </button>
                                    )}
                                </div>
                                {formik.touched[field] && formik.errors[field] && (
                                    <p className="text-red-500 text-sm">{formik.errors[field]}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Address */}
                    <div>
                        <h2 className="text-lg font-bold text-primaryBlue mb-4">Address</h2>
                        {['street', 'city', 'country', 'zipCode'].map((field) => (
                            <div className="mb-6" key={field}>
                                <label
                                    htmlFor={field}
                                    className="block text-gray-700 font-medium mb-2 capitalize"
                                >
                                    {field.replace(/([A-Z])/g, ' $1')}
                                </label>
                                <input
                                    id={field}
                                    {...formik.getFieldProps(field)}
                                    className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring ${
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
                </div>

                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="w-full bg-gradient-to-r from-primaryBlue to-secondaryBlue text-white py-3 px-6 rounded shadow hover:opacity-90 transition-opacity"
                >
                    {formik.isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}
