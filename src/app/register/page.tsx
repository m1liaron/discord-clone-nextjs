import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { AppPath } from "@/common/enums/app/AppPath";
import { useAppDispatch } from "@/store/store";
import { register } from "@/store/auth/authThunk";
import { RegisterRequest } from "@/common/types/Auth/auth.types";
import { useRouter } from 'next/router.js';
import Link from 'next/link';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    month: Yup.string().required('Month is required'),
    day: Yup.number().min(1).max(31).required('Day is required'),
    year: Yup.number().required('Year is required')
});

export default function page () {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const initialValues = {
        email: '',
        displayName: '',
        username: '',
        password: '',
        month: '',
        day: '',
        year: ''
    };

    // Helper functions to create options for day, month, and year dropdowns
    const createOptionMonth = () => {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months.map((month, index) => (
            <option key={index} value={index + 1}>{month}</option>
        ));
    };

    const createOptionDay = () => {
        return Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
            <option key={day} value={day}>{day}</option>
        ));
    };

    const createOptionYear = () => {
        const currentYear = new Date().getFullYear();
        return Array.from({ length: currentYear - 1829 }, (_, i) => currentYear - i).map(year => (
            <option key={year} value={year}>{year}</option>
        ));
    };

    const handleSubmit = async (values: typeof initialValues) => {
        const { email, displayName, username, password, month, day, year } = values;
        const registerData: RegisterRequest = {
            email,
            displayName,
            username,
            password,
            dateOfBirth: new Date(+year, +month - 1, +day)
        };
        const response = await dispatch(register(registerData));
        if(register.rejected.match(response)) {
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
                  <h2 className="text-2xl font-bold text-center mb-6 text-white">Create an account</h2>
    
                  {/* Email */}
                  <label className={`block font-bold text-sm mb-2 uppercase ${errors.email && touched.email ? 'text-red-500' : 'text-gray-400'}`}>
                    {errors.email && touched.email ? 'Email - Required' : 'Email *'}
                  </label>
                  <Field 
                    type="text" 
                    name="email" 
                    className="w-full p-2 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500" 
                  />
    
                  {/* Display Name */}
                  <label className="block font-bold text-sm mb-2 text-gray-400 uppercase">Display Name</label>
                  <Field 
                    type="text" 
                    name="displayName" 
                    className="w-full p-2 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500" 
                  />
    
                  {/* Username */}
                  <label className={`block font-bold text-sm mb-2 uppercase ${errors.username && touched.username ? 'text-red-500' : 'text-gray-400'}`}>
                    {errors.username && touched.username ? 'Username - Required' : 'Username *'}
                  </label>
                  <Field 
                    type="text" 
                    name="username" 
                    className="w-full p-2 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500" 
                  />
    
                  {/* Password */}
                  <label className={`block font-bold text-sm mb-2 uppercase ${errors.password && touched.password ? 'text-red-500' : 'text-gray-400'}`}>
                    {errors.password && touched.password ? 'Password - Required' : 'Password *'}
                  </label>
                  <Field 
                    type="password" 
                    name="password" 
                    className="w-full p-2 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500" 
                  />
    
                  {/* Date of Birth */}
                  <label className={`block font-bold text-sm mb-2 uppercase ${errors.day && touched.day ? 'text-red-500' : 'text-gray-400'}`}>
                    {errors.day && touched.day ? 'Date of Birth - Required' : 'Date of Birth *'}
                  </label>
                  <div className="flex space-x-4 mb-4">
                    <Field 
                      as="select" 
                      name="month" 
                      className="w-1/3 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Month</option>
                      {/* Insert Month Options Here */}
                    </Field>
                    <Field 
                      as="select" 
                      name="day" 
                      className="w-1/3 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Day</option>
                      {/* Insert Day Options Here */}
                    </Field>
                    <Field 
                      as="select" 
                      name="year" 
                      className="w-1/3 p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Year</option>
                      {/* Insert Year Options Here */}
                    </Field>
                  </div>
    
                  {/* Submit Button */}
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