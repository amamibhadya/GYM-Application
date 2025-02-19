import React from 'react'
import './login.css'
import tealogin from '../assets/images.jpeg'

const login = () => {
  return (
     <div className='middle'>
        <img src={tealogin} alt=""/>
        <div className='wrapper'>
            <form action=''>
                <h1>Login</h1>
            <div className='input-box'>
                <input type='text' placeholder='User name' required/>
            </div>
            <div className='input-box'>
                <input type='text' placeholder='Password' required/>
            </div>
            <div className='remember-forgot'>
                <label><input type='checkbox'/>Remeber me</label>
                <a href='#' >Forgot Password?</a>
            </div>
            <button type='submit'>Login</button>
            <div className='register-link'>
                <p>Dont have an account? <a href="#">Create one</a></p>
            </div>
        </form>    
    </div>
    </div>

  );
};

export default login