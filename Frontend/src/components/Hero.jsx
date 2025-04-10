import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

function Hero() {
  return (
    <section className='hero flex justify-center items-center h-screen bg-gray-800'>
        <div className='content text-center text-white'>
            <div className='title mb-8'>
                <h1 className='text-6xl font-bold'>L</h1>
                <h1 className='text-6xl font-bold'>GET</h1>
                <h1 className='text-6xl font-bold'>MOVING</h1>
            </div>
            {/* Buttons for separate pages */}
            <div className="auth-buttons mt-8 flex gap-x-6 justify-center">
                <Link to="/signup">
                    <button className="px-6 py-3 text-lg font-semibold bg-green-500 text-white rounded-lg hover:bg-green-400 transition duration-300">
                        Sign Up
                    </button>
                </Link>
                <Link to="/signin">
                    <button className="px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-400 transition duration-300">
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    </section>
  );
}

export default Hero;
