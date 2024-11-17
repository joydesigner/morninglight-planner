'use client';

import { useState } from 'react';

export default function Signup() {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="max-w-md mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white shadow-md rounded-lg">
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                        type="email"
                        placeholder="Enter your email address"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm pr-10"
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

                {/* Signup Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Create an account
                </button>
            </form>

            {/* Social Signup */}
            <div className="mt-6">
                <p className="text-center text-sm text-gray-500 mb-4">OR Continue with</p>
                <div className="flex justify-center gap-4">
                    <button
                        className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-300"
                    >
                        <img src="/images/facebook-icon.svg" alt="Facebook" width={24} />
                        Facebook
                    </button>
                    <button
                        className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-300"
                    >
                        <img src="/images/google-icon.svg" alt="Google" width={24} />
                        Google
                    </button>
                    <button
                        className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-gray-300"
                    >
                        <img src="/images/apple-icon.svg" alt="Apple" width={24} />
                        Apple
                    </button>
                </div>
            </div>
        </div>
    );
}