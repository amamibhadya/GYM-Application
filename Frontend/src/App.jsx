import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Workoutsessions from './components/Workoutsessions';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import BMICalculator from './components/BMICalculator';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Signup from './authentication/signup/signup'; // Ensure correct path
import Signin from './authentication/login/login';  // Ensure correct path

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Workoutsessions />
              <Gallery />
              <Pricing />
              <BMICalculator />
              <Footer />
              <Contact />
            </>
          }
        />

        {/* SignIn Route */}
        <Route path="/signin" element={<Signin />} />

        {/* SignUp Route */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
