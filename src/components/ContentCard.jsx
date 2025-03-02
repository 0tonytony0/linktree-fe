import React from "react";

const ContentCard = ({ title, description, image }) => {
  return (
    <div className="content-card">      
      <div className="content-text">
        <h1>{title}</h1>
        <p>{description}</p>
     </div>
     <img src={image} alt="Content Preview" className="content-image" />
    </div>
  );
};

export default ContentCard;
