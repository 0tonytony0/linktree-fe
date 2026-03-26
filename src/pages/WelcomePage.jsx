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
    username: "",
    category: "",
  });

  const updateHandler = () => {
    console.log({ index });
    setIndex((prev) => {
      console.log("Previous Index:", prev);
      return prev + 1;
    });
  };

  const handleSignUp = async (finalData) => {
    const { f_name, l_name, email, password, username, category } = finalData;

    try {
      const res = await register({
        f_name,
        l_name,
        email,
        password,
        username,
        category,
      });

      if (res.success && res.data.success) {
        const { user: registeredUser, token } = res.data.data;

        const userData = {
          f_name: registeredUser.f_name,
          l_name: registeredUser.l_name,
          username: registeredUser.username,
          email: registeredUser.email,
          isAuthenticated: true,
        };

        // Store token for future requests
        localStorage.setItem("token", token);

        dispatch(setUser(userData));
        toast.success("Welcome! Your account has been created.");
        navigate("/main");
      } else {
        const errorMsg = res.data?.message || "Registration failed. Please try again.";
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error("Something went wrong. Please check your connection.");
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
          formData={formData}
          setFormData={setFormData}
          handleSignUp={handleSignUp}
        />
      )}

      <div className="welcome-image">
        <img src="/images/welcome2.jpeg" />
      </div>
    </div>
  );
};

export default WelcomePage;
