import React from "react";

const ContentCard = ({ title, description, image }) => {
  return (
    <div className="content-card">
      <div className="content-text">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className="content-image">
        <img src={image} alt="Content Sharing" />
      </div>
    </div>
  );
};

export default ContentCard;
