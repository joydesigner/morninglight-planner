
'use client';

import dynamic from 'next/dynamic';
import { gql, useMutation } from "@apollo/client";
import { useState } from 'react';
import Image from "next/image";

const REGISTER_USER = gql`
    mutation RegisterUser($email: String!, $password: String!, $profileName: String!) {
        register(email: $email, password: $password, profileName: $profileName) {
            email
            profileName
        }
    }
`;

const SignupForm = ()=> {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        profileName: ''
    });

    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await registerUser({ variables: formData });
            console.log("Account created successfully", response);
            setFormData({email: '', password: '', profileName: ''});
            // Handle successful registration (e.g., redirect to login page)
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="max-w-md mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-transparent shadow-md rounded-lg">
            <h1 className="text-2xl font-semibold text-gray-800 text-center">
                Create an account
            </h1>
            <p className="text-sm text-gray-600 text-center mt-2">
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline">
                    Log in
                </a>
            </p>

            <form className="mt-6 space-y-4">
                {/* Profile Name */}
                <div>
                    <label
                        htmlFor="profileName"
                        className="block text-sm font-medium text-gray-700"
                    >
                        What should we call you?
                    </label>
                    <input
                        id="profileName"
                        type="text"
                        placeholder="Enter your profile name"
                        value={formData.profileName}
                        onChange={handleChange}
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm/6"
                    />
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        What's your email?
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm/6"
                    />
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Create a password
                    </label>
                    <div className="mt-1 relative">
                        <input
                            id="password"
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm/6"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-800"
                        >
                            {passwordVisible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        Use 8 or more characters with a mix of letters, numbers & symbols
                    </p>
                </div>

                {/* Terms and Policy */}
                <p className="text-xs text-gray-500 text-center mt-4">
                    By creating an account, you agree to the{' '}
                    <a href="/terms" className="text-blue-600 hover:underline">
                        Terms of use
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                    </a>
                    .
                </p>

                {/* Index Button */}
                <button
                    type="submit"
                    className="w-full bg-yellow-600 text-white py-2 px-4 rounded-full shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                >
                    Create an account
                </button>
            </form>

            {/* Social Index */}
            <div className="mt-6">
                <p className="text-center text-sm text-gray-500 mb-4">OR Continue with</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="flex w-36 text-black text-xs items-center gap-1 border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-300"
                    >
                        <Image src="/images/facebook-96.svg" alt="Facebook" width={24} height={24} />
                        Facebook
                    </button>
                    <button
                        className="flex w-36 text-black text-xs items-center gap-1 border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-300"
                    >
                        <Image src="/images/google-96.svg" alt="Google" width={24} height={24} />
                        Google
                    </button>
                    <button
                        className="flex w-36 text-black text-xs items-center gap-1 border border-gray-300 px-4 py-2 rounded-full shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-orange-300"
                    >
                        <Image src="/images/apple-black-100.svg" alt="Apple" width={24} height={24} />
                        Apple
                    </button>
                </div>
            </div>
        </div>
    );
};
const DynamicSignupFrom = dynamic(() => Promise.resolve(SignupForm), { ssr: false });
export default DynamicSignupFrom;
