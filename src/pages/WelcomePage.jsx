import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <img src="images/spark-logo.svg" alt="Spark Logo" className="logo" />
                <div className='welcome-content-main'>
                    <h1>Sign up to your Spark</h1>
                    <h3>Welcome to Spark</h3>


                    <Link to="/createacc">
                        <button className="email-btn">Continue with email</button>
                    </Link>


                    <p>Already have an account? <Link to="/login">Sign in</Link></p>
                </div>
            </div>

            <div className="welcome-image">
                <img src="images/welcome2.jpeg" alt="Side Illustration" />
            </div>
        </div>
    );
};

export default WelcomePage;
