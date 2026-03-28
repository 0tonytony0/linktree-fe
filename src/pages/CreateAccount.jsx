import React, { useState } from "react";
import "./CreateAccount.css";
import logo from "../assets/spark-logo.svg";
import rightImage from "../assets/welcome2.jpeg";
import { Link, useNavigate } from "react-router-dom";

const CreateAccount = ({ updateHandler, formData, setFormData }) => {
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  // const [apiError, setApiError] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});

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

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    validateForm(updatedFormData);
  };

  // Validate Form
  const validateForm = (data, isSubmit = false) => {
    const newErrors = {};

    if (!data.f_name || data.f_name.trim().length < 3) {
      if (isSubmit || touchedFields.f_name) newErrors.f_name = "First name is required (min 3 chars)*";
    }

    if (!data.email) {
      if (isSubmit || touchedFields.email) newErrors.email = "Email is required*";
    } else if (!emailRegex.test(data.email)) {
      if (isSubmit || touchedFields.email) newErrors.email = "Invalid Email format*";
    }

    if (!data.password) {
      if (isSubmit || touchedFields.password) newErrors.password = "Password is required*";
    } else if (!passwordRegex.test(data.password)) {
      if (isSubmit || touchedFields.password) newErrors.password = "Password must be at least 8 chars with uppercase, lowercase, number, and special char*";
    }

    if (!data.confirmPassword) {
      if (isSubmit || touchedFields.confirmPassword) newErrors.confirmPassword = "Confirm password is required*";
    } else if (data.password !== data.confirmPassword) {
      if (isSubmit || touchedFields.confirmPassword) newErrors.confirmPassword = "Passwords do not match*";
    }

    if (!data.agree && isSubmit) {
      newErrors.agree = "You must agree to the terms*";
    }

    setErrors(newErrors);
    setIsButtonDisabled(Object.keys(newErrors).length > 0 || !data.agree);
    return newErrors;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData)

    setTouchedFields({
      f_name: true,
      l_name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(newErrors).length === 0 && formData.agree){
      updateHandler();
    }
    // setFormData();
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
            <Link to="/login" className="signin-link">
              Sign in instead
            </Link>
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
              {touchedFields.f_name && errors.f_name && (
                <p className="error-text">{errors.f_name}</p>
              )}
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
              {touchedFields.email && errors.email && (
                <p className="error-text">{errors.email}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              {touchedFields.password && errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "error" : ""}
              />
              {touchedFields.confirmPassword && errors.confirmPassword && (
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
            {touchedFields.agree && errors.agree && (
              <p className="error-text">{errors.agree}</p>
            )}
            <button
              type="submit"
              className="create-acc"
              disabled={isButtonDisabled}
              // onClick={() => updateHandler()}
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
