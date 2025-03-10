import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../services/authService";
import { setUser } from "../store/userSlice";
import { toast } from "react-toastify";


const Settings = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    f_name: user.f_name,
    l_name: user.l_name,
    email: user.email,
    password: "",
    confirmPassword: "",
  });
  console.log({ user });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const updatedData = await updateUser(formData);
      dispatch(setUser({ ...user, ...formData }));
      toast.success("saved successfully!");
    } catch (error) {
      console.error(error);
      toast.error("something went wrong . Please try again.");
    }
  };

  return (
    <div className="settings-container">
      <img src={"/images/settings-header.svg"} alt="" className="" />
      <form onSubmit={handleSubmit} className="settings-form">
        <label>First name</label>
        <input
          type="text"
          name="f_name"
          value={formData.f_name}
          onChange={handleChange}
        />

        <label>Last name</label>
        <input
          type="text"
          name="l_name"
          value={formData.l_name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input type="email" name="email" value={formData.email} readOnly />

        <label>New Password</label>
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
        <div className="save-btn-container">
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
