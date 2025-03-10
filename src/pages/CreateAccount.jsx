import React, { useState } from "react";
import "./CreateAccount.css";
import logo from "../assets/spark-logo.svg";
import rightImage from "../assets/welcome2.jpeg";
import { Link, useNavigate } from "react-router-dom";
const CreateAccount = ({ updateHandler, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Regex for validations
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    setFormData(updatedFormData);
    validateForm(updatedFormData);
  };

  // Validate Form
  const validateForm = (data) => {
    const newErrors = {};

    if (!data.f_name || data.f_name.length < 3) newErrors.f_name = " name required*";
    if (!emailRegex.test(data.email)) newErrors.email = "Invalid Email*";
    if (!data.password) {
      newErrors.password = "Please enter your password*";
    } else if (!passwordRegex.test(data.password)) {
      newErrors.password =
        "The password must be at least 8 characters long* and include at least 1 uppercase, lowercase, number, and special character (@$!%*?&)*";
    }

    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Password did not match*";

    setErrors(newErrors);
    setIsButtonDisabled(Object.keys(newErrors).length > 0 || !data.agree);
  };

  // Handle Form Submit
  const handleSubmit = async (data) => {
    setFormData();
  };

  return (
    <div className="create-account-wrapper">
      {/* Left Section */}
      <div className="acc-left-section">
        <img src={logo} alt="Spark Logo" className="spark-logo" />

        <h1 className="title">Sign up to your Spark</h1>
        <div className="account-container">
          <div className="account-header">
            <h3>Create an account</h3>
            <a href="/login" className="signin-link">
              Sign in instead
            </a>
          </div>

          <form className="account-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="f_name"
                placeholder="First name"
                value={formData.f_name}
                onChange={handleChange}
                className={errors.f_name ? "error" : ""}
              />
              {errors.f_name && <p className="error-text">{errors.f_name}</p>}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="l_name"
                placeholder="Last name"
                value={formData.l_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {errors.confirmPassword && (
                <p className="error-text">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <label>
                By creating an account, I agree to the{" "}
                <a href="#">Terms of use</a> and <a href="#">Privacy Policy</a>
              </label>
            </div>
            {apiError && <p className="error-text">{apiError}</p>}
            <button
              type="submit"
              className="create-acc"
              disabled={isButtonDisabled}
              onClick={() => updateHandler()}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
      {/* <div className="right-section">
        <img src={rightImage} alt="Right Section" className="right-image" />
      </div> */}
    </div>
  );
};

export default CreateAccount;
