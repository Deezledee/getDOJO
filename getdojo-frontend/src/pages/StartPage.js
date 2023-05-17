import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../images/background-logo.gif';
import '../index.css';

function StartPage() {
  return (
    <div className='startPage' style={{ backgroundImage: `url(${backgroundImage})`}}>
      <div className='buttonContainer'>
        <Link to="/signup" className='signupButton'>Sign Up</Link>
        <Link to="/login" className='loginButton'>Login</Link>
      </div>
    </div>
  );
};

export default StartPage;
