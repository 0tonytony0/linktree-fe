import React, { useState } from "react";
import "./TellUsAboutYourself.css";
import sparkLogo from "../assets/spark-logo.svg";
import Main from "./Main";
import { useNavigate } from "react-router-dom";

const TellUsAboutYourself = ({ handleSignUp = () => {}, setFormData , formData}) => {
  const [username, setUsername] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // const navigate = useNavigate();

  const categories = [
    { label: "💼 Business" },
    { label: "🎨 Creative" },
    { label: "📚 Education" },
    { label: "🎵 Entertainment" },
    { label: "🧪 Fashion & Beauty" },
    { label: "🍕 Food & Beverage" },
    { label: "⚖️ Government & Politics" },
    { label: "🍎 Health & Wellness" },
    { label: "💖 Non-Profit" },
    { label: "💟 Other" },
    { label: "💻 Tech" },
    { label: "✈️ Travel & Tourism" },
  ];

  const handleCategoryClick = (category) => {
    if (!category || !category.label) return;
    setSelectedCategory(category.label);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!username.trim() || !selectedCategory) {
      alert("Please enter a username and select a category.");
      return;
    }

    const combinedData = {
      ...formData,
      username,
      category: selectedCategory,
    };

    handleSignUp(combinedData);
  };

  return (
    <div className="about-container">
      <div className="left-section">
        <img src={sparkLogo} alt="Spark Logo" className="logo" />
        <div className="left-section-main">
          <h1>Tell us about yourself</h1>
          <p>For a personalized Spark experience</p>

          <input
            type="text"
            placeholder="Tell us your username"
            className="username-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <p className="category-text">
            Select one category that best describes your Linktree:
          </p>

          <div className="categories">
            {categories.map((cat) => (
              <button
                key={cat.label}
                className={`category ${
                  selectedCategory === cat.label ? "active" : ""
                }`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <button className="continue-btn" onClick={handleContinue}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default TellUsAboutYourself;
