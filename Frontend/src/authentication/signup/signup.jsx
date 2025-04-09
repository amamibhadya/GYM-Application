import backgroundimg from '../../assets/signin.jpg'; 
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
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
    const mode = 'light';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailSignUp = async (e) => {
        e.preventDefault();
        console.log("Sign-up button clicked");
    
        try {
            console.log("Sending request to backend...");
            const result = await axios.post("http://http://13.48.148.7:3001/signup", { email, password });
    
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
        <div className={`container ${mode === 'dark' ? 'dark-mode' : ''}`} style={{ backgroundImage: `url(${backgroundimg})` }}>
            <div className="form-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleEmailSignUp}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>
                <div className="divider">or</div>
                {providers.map((provider) => (
                    <button key={provider.id} onClick={() => signup(provider)}>
                        Sign up with {provider.name}
                    </button>
                ))}
                <p>
                    Have an account? <Link to="/Signin">Sign In</Link>
                </p>
                <p className="terms">
                    By signing in, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </p>
            </div>
        </div>
    );
}

export default Signup;
