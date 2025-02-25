import React, { useState } from 'react';
import backgroundimg from '../../assets/signin.jpg'; 
import { Link } from "react-router-dom";

const providers = [
    { id: 'google', name: 'Google' },
];

const signIn = async (provider) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Sign in with ${provider.id}`);
            resolve({ error: 'This is a mock error message.' });
        }, 500);
    });
};

export default function ThemeSignInPage() {
    const mode = 'light';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailSignIn = (e) => {
        e.preventDefault();
        console.log('Signing in with Email and Password:', { email, password });
    };

    return (
        <div
            className={`signin-page-container min-h-screen flex items-center justify-center ${
                mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-white'
            }`}
            style={{
                backgroundImage: `url(${backgroundimg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="w-full max-w-md p-8 bg-black/70 shadow-xl rounded-2xl bg-opacity-50">
                <h1 className="text-2xl font-extrabold text-center mb-8 text-white">
                    Sign In
                </h1>

                <form className="space-y-4" onSubmit={handleEmailSignIn}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full py-3 px-6 bg-[#1E3A8A] text-white font-medium text-lg rounded-lg hover:bg-[#1E40AF] transition duration-200" >
                       <Link to="/home" className="text-blue-600 underline hover:text-blue-700">
                            Sign In
                        </Link>
                    </button>
                </form>

                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-500">or</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {providers.map((provider) => (
                    <button
                        key={provider.id}
                        type="button"
                        onClick={() => signIn(provider)}
                        className="w-full py-3 px-6 bg-gray-200 text-black font-medium text-lg rounded-lg hover:bg-[#F3F4F6] transition duration-200"
                    >
                        Sign in with {provider.name}
                    </button>
                ))}

                <div className="mt-6 text-center">
                    <p className="text-base text-gray-500">
                        Don't have an account? {' '}
                        <Link to="/signup" className="text-blue-600 underline hover:text-blue-700">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}