import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../services/authService";
import { setUser } from "../store/userSlice";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaTrashAlt } from "react-icons/fa";

const Settings = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    f_name: user.f_name || "",
    l_name: user.l_name || "",
    email: user.email || "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const updatedData = await updateUser(formData);
      dispatch(setUser({ ...user, ...formData }));
      toast.success("Settings saved successfully! 🎉");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update settings. Please try again.");
    }
  };

  return (
    <div className="settings-container">
      {/* Premium Hero Section */}
      <div className="settings-hero">
        <div className="hero-content">
          <div className="hero-avatar">
            <FaUser />
          </div>
          <div className="hero-text">
            <h2>Edit Profile</h2>
            <p>{user.f_name} {user.l_name} ({user.username})</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-section-title">
          <h3>Personal Information</h3>
        </div>

        <div className="settings-grid">
          <div className="settings-group">
            <label>First Name</label>
            <div className="input-with-icon">
              <FaUser className="field-icon" />
              <input
                type="text"
                name="f_name"
                placeholder="First name"
                value={formData.f_name}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="settings-group">
            <label>Last Name</label>
            <div className="input-with-icon">
              <FaUser className="field-icon" />
              <input
                type="text"
                name="l_name"
                placeholder="Last name"
                value={formData.l_name}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="settings-group">
          <label>Email Address</label>
          <div className="input-with-icon readonly">
            <FaEnvelope className="field-icon" />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              readOnly 
              title="Email cannot be changed"
            />
          </div>
        </div>

        <div className="settings-section-title spacing">
          <h3>Security</h3>
        </div>

        <div className="settings-grid">
          <div className="settings-group">
            <label>New Password</label>
            <div className="input-with-icon">
              <FaLock className="field-icon" />
              <input
                type="password"
                name="password"
                placeholder="New password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="settings-group">
            <label>Confirm Password</label>
            <div className="input-with-icon">
              <FaLock className="field-icon" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="save-btn-container">
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </div>

        {/* Danger Zone */}
        <div className="danger-zone">
          <div className="danger-title">Danger Zone</div>
          <div className="danger-box">
             <div className="danger-info">
               <h4>Delete Account</h4>
               <p>Permanently delete your profile and all link data. This action cannot be undone.</p>
             </div>
             <button type="button" className="delete-account-btn">
               <FaTrashAlt /> Delete Profile
             </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
