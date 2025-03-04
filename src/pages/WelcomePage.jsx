import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.css";
import CreateAccount from "./CreateAccount";

const WelcomePage = () => {
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  return (
    <div className="welcome-container">
      {showCreateAccount ? (
        <CreateAccount />
      ) : (
        <div className="welcome-content">
          <img src="images/spark-logo.svg" alt="Spark Logo" className="logo" />
          <div className="welcome-content-main">
            <h1>Sign up to your Spark</h1>
            <h3>Welcome to Spark</h3>
            {/* Clicking this button will show the CreateAccount component */}
            <button className="email-btn" onClick={() => setShowCreateAccount(true)}>
              Continue with email
            </button>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      )}

      <div className="welcome-image">
        <img src="images/welcome2.jpeg" alt="Side Illustration" />
      </div>
    </div>
  );
};

export default WelcomePage;

