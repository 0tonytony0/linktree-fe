import React, { useState } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: "Jenny",
    lastName: "Wilson",
    email: "JennyWilson08@gmail.com", // Email should be read-only
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    // Implement API call to save changes if needed
  };

  return (
    <div className="settings-container">
      <img src={"/images/settings-header.svg"} alt="" className=""  />
      <form onSubmit={handleSubmit}>
        <label>First name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label>Last name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} readOnly />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button type="submit" className="save-btn">
          Save
        </button>
      </form>
    </div>
  );
};

export default Settings;
