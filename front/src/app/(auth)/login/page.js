'use client';

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/General/Button";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters"),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            try {
                const response = await fetch("http://localhost:5000/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem("token", data.token);
                    window.location.href = "/";
                } else {
                    const errorData = await response.json();
                    setErrors({ serverError: errorData.error || "Login failed." });
                }
            } catch (error) {
                setErrors({ serverError: "An error occurred. Please try again." });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form
                className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg"
                onSubmit={formik.handleSubmit}
            >
                <h1 className="text-3xl font-semibold text-primaryBlue mb-8">Login</h1>
                {formik.errors.serverError && (
                    <p className="text-red-500 text-sm mb-4">{formik.errors.serverError}</p>
                )}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...formik.getFieldProps("email")}
                        className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring ${
                            formik.touched.email && formik.errors.email
                                ? "border-red-500"
                                : "border-gray-300"
                        }`}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    )}
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...formik.getFieldProps("password")}
                            className={`w-full px-4 py-3 border rounded focus:outline-none focus:ring ${
                                formik.touched.password && formik.errors.password
                                    ? "border-red-500"
                                    : "border-gray-300"
                            }`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primaryBlue"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <p className="text-red-500 text-sm">{formik.errors.password}</p>
                    )}
                </div>
                <Button
                    variant="submit"
                    disabled={formik.isSubmitting}
                >
                    {formik.isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <p className="text-gray-500 text-sm mt-4">
                    Don't have an account?{" "}
                    <a href="/register" className="text-primaryBlue underline">
                        Register here
                    </a>
                </p>
            </form>
        </div>
    );
}
