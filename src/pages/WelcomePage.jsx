import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import CreateAccount from "./CreateAccount";
import TellUsAboutYourself from "./TellUsAboutYourself";
import Welcome from "../components/Welcome";
import { register } from "../services/authService";

const WelcomePage = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
      f_name: "",
      l_name: "",
      email: "",
      password: "",
      agree: false,
    });

    const updateHandler = () => {
            setIndex((prev) => prev+1);
    }

    const handleSignUp = async(data) => {
        console.log(formData, "formData")
        try {
            const response = await register({...formData, ...data});
            console.log("Registration successful:", response);
            navigate('/main');
        } catch (error) {
            console.error("Registration failed:", error);
          }
    }

  return (
    <div className="welcome-container">
       {index === 0 &&  (<Welcome updateHandler={updateHandler}/>)}
        {index === 1 && <CreateAccount updateHandler={updateHandler} setFormData={setFormData} formData={formData}/>}
        {index === 2 && <TellUsAboutYourself handleSignUP={()=>handleSignUp}/>}

      <div className="welcome-image">
        <img src="images/welcome2.jpeg" alt="Side Illustration" />
      </div>
    </div>
  );
};

export default WelcomePage;

