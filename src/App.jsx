import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import Pricing from './components/Pricing';
import Workoutsessions from './components/Workoutsessions';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import BMICalculator from './components/BMICalculator';
import Footer from './components/Footer';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <Navbar/>
      <Hero/>
      <Workoutsessions/>
      <Gallery/>
      <Pricing/>
      <Contact/>
      <BMICalculator/>
      <Footer/>
      <ToastContainer theme='dark' position='top-center'/>

    </Router>
  )
}

export default App