import React, { useState } from "react";
import "./LoginPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import sparkLogo from "../assets/spark-logo.svg";
import rightSectionImage from "../assets/welcome2.jpeg";
import { login } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For redirecting after login

  // 🔹 Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // 🔹 Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loginData = await login(username, password);
      console.log({ loginData });
      dispatch(setUser(loginData.user));
      toast.success("Login successful! 🎉");
      navigate("/main?tab=links");
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Left Section: Login Form */}
      <div className="login-left">
        <img src={sparkLogo} alt="Spark Logo" className="logo" />
        <div className="login-main">
          <h1>Sign in to your Spark</h1>

          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Spark/Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            {/* Password Field with Toggle */}
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* 🔹 Show Error Message */}
            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="login-btn-loginpage">
              Log in
            </button>

            <Link to="/forgot-password" className="forgot-password">
              Forgot password ?
            </Link>
            <p>
              Don't have an account ? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>

        <p className="terms">
          This site is protected by reCAPTCHA and the&nbsp;
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Privacy Policy
          </a>
          &nbsp;and&nbsp;
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          &nbsp;apply.
        </p>
      </div>

      {/* Right Section: Background Image */}
      <div
        className="login-right"
        style={{ backgroundImage: `url(${rightSectionImage})` }}
      ></div>
    </div>
  );
};

export default LoginPage;
