import React from "react";
import { Link } from "react-router-dom";

const InfoCard = ({ title, description, buttonText, image, }) => {

  return (
    <div className="info-card">
      <div className="info-text">
        <h1>{title}</h1>
        <p>{description}</p>
        <Link to="/signup">
          <button className="cta-button">{buttonText}</button>
        </Link>
      </div>
      <div className="info-image">
        <img src={image} alt="Dashboard Preview" />
      </div>
    </div>
  );
};

export default InfoCard;
