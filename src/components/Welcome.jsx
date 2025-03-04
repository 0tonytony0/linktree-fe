import React, { useState } from "react";
import '../pages/WelcomePage'
import { Link } from "react-router-dom";

const Welcome = ({updateHandler}) => {
  

  return (
    <div className="welcome-content">
          <img src="images/spark-logo.svg" alt="Spark Logo" className="logo" />
          <div className="welcome-content-main">
            <h1>Sign up to your Spark</h1>
            <h3>Welcome to Spark</h3>
            {/* Clicking this button will show the CreateAccount component */}
            <button className="email-btn" onClick={()=>updateHandler()}>
              Continue with email
            </button>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
  );
};

export default Welcome;
