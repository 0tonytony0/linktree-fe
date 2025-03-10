import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import CreateAccount from "./CreateAccount";
import TellUsAboutYourself from "./TellUsAboutYourself";
import Welcome from "../components/Welcome";
import { register } from "../services/authService";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const WelcomePage = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    agree: false,
  });

  const updateHandler = () => {
    console.log({ index });
    setIndex((prev) => {
      console.log("Previous Index:", prev);
      return prev + 1;
    });
  };

  const handleSignUp = async (data) => {
    
    const userFormData = {
      username: data.username,
      category: data.selectedCategory.split(" ")[1],
    };
    console.log(formData, "formData");
    console.log(userFormData);
    console.log("inside handleSignUp", data, userFormData);
    
    try {
      const response = await register({ ...formData, ...userFormData });
      console.log("Registration successful:", response);
      const data = response.userData;
      console.log({ data });
      const userData = {
        f_name: data.f_name,
        l_name: data.l_name,
        username: data.username,
        email: data.email,
        isAuthenticated: true,
      };

      console.log({ userData });
      dispatch(setUser(userData));
      navigate("/main");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="welcome-container">
      {index === 0 && <Welcome updateHandler={updateHandler} />}
      {index === 1 && (
        <CreateAccount
          updateHandler={updateHandler}
          setFormData={setFormData}
          formData={formData}
        />
      )}
      {index === 2 && (
        <TellUsAboutYourself
          handleSignUp={handleSignUp}
          updateHandler={updateHandler}
        />
      )}

      <div className="welcome-image">
        <img src="/images/welcome2.jpeg" />
      </div>
    </div>
  );
};

export default WelcomePage;
