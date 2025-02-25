import backgroundimg from '../../assets/signin.jpg'; 
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"; // Ensure correct import
import axios from "axios";

const providers = [
    { id: 'google', name: 'Google' },
];

const signup = async (provider) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Sign in with ${provider.id}`);
            resolve({ error: 'This is a mock error message.' });
        }, 500);
    });
};

function Signup() {
    const mode = 'light'; // Simulate light mode (can toggle dynamically)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailSignUp = async (e) => {
      e.preventDefault();
      console.log("Sign-up button clicked");
  
      try {
          console.log("Sending request to backend...");
          const result = await axios.post("http://localhost:3001/signup", { email, password });
  
          console.log("Response received:", result);
  
          if (result.status === 201) {
              console.log("✅ User Created Successfully:", result.data);
              navigate("/Signin");
          } else {
              console.log("Unexpected response status:", result.status);
          }
      } catch (err) {
          console.error("❌ Signup error:", err);
          if (err.response) {
              console.log("Error Response Data:", err.response.data);
              if (err.response.status === 400) {
                  window.alert("Email already exists");
              } else {
                  window.alert("Server error. Try again later.");
              }
          } else {
              console.log("No response from server. Backend might be down.");
          }
      }
  };
  
    return (
        <div
            className={`min-h-screen flex items-center justify-center ${
                mode === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-white'
            }`}
            style={{
                backgroundImage: `url(${backgroundimg})`, // Correctly use template literals here
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Card Container */}
            <div className="w-full max-w-md p-8 bg-black/70 shadow-xl rounded-2xl bg-opacity-50">
                {/* Title */}
                <h1 className="text-2xl font-extrabold text-center mb-8 text-white">
                    Sign Up
                </h1>

                {/* Email and Password Form */}
                <form className="space-y-4" onSubmit={handleEmailSignUp}>
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
                        className="w-full py-3 px-6 bg-[#1E3A8A] text-white font-medium text-lg rounded-lg hover:bg-[#1E40AF] transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <div className="flex-1 h-px bg-gray-300"></div>
                    <span className="px-3 text-gray-500">or</span>
                    <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {/* Sign-In with Google */}
                {providers.map((provider) => (
                    <button
                        key={provider.id}
                        type="button"
                        onClick={() => signup(provider)} // Corrected function call
                        className="w-full py-3 px-6 bg-gray-200 text-black font-medium text-lg rounded-lg hover:bg-[#F3F4F6] transition duration-200"
                    >
                        Sign up with {provider.name}
                    </button>
                ))}

                {/* Sign In Link */}
                <div className="mt-6 text-center">
                    <p className="text-base text-gray-500">
                        Have an account?{' '}
                        <Link to="/Signin" className="text-blue-600 underline hover:text-blue-700">
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        By signing in, you agree to our{' '}
                        <a href="#" className="text-blue-600 underline hover:text-blue-700">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-blue-600 underline hover:text-blue-700">
                            Privacy Policy
                        </a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;