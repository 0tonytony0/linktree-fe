import React, { useEffect } from "react";
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
      <img src={image} alt="Dashboard Preview" className="info-image" />
    </div>
  );
};

export default InfoCard;
