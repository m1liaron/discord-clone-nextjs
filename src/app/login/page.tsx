'use client';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AppPath } from "@/common/enums/app/AppPath";
import { useAppDispatch } from "@/store/store";
import { login } from "@/store/auth/authThunk";
import { LoginRequest } from "@/common/types/Auth/auth.types";
import Link from 'next/link';
import {useRouter} from "next/navigation";

export default function Page () {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    });


    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (values: typeof initialValues) => {
        const { email, password } = values;
        const loginData: LoginRequest = {
            email,
            password,
        };
        const response = await dispatch(login(loginData));
        if(login.rejected.match(response)) {
            console.log('error')
        } else {
            router.push(AppPath.Root);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/path-to-your-image')" }}>
            <div className="bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-md">
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <h2 className="text-2xl font-bold text-center mb-6 text-white">Login</h2>

                            <label className={`block font-bold text-sm mb-2 uppercase ${errors.email && touched.email ? 'text-red-500' : 'text-gray-400'}`}>
                                {errors.email && touched.email ? 'Email - Required' : 'Email *'}
                            </label>
                            <Field
                                type="text"
                                name="email"
                                className="w-full p-2 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                            />

                            <label className={`block font-bold text-sm mb-2 uppercase ${errors.password && touched.password ? 'text-red-500' : 'text-gray-400'}`}>
                                {errors.password && touched.password ? 'Password - Required' : 'Password *'}
                            </label>
                            <Field
                                type="password"
                                name="password"
                                className="w-full p-2 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition duration-300 mb-4"
                                disabled={isSubmitting}
                            >
                                Sign Up
                            </button>

                            <Link href="/login" className="text-blue-500 hover:underline text-center block">
                                Already have an account?
                            </Link>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};