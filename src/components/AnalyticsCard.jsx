import React from "react";

const AnalyticsCard = ({ title, description, image }) => {
    return (
        <div className="analytics-card">
            <img src={image} alt="Dashboard Preview" className="analytics-image" />
            <div className="analytics-text">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>

        </div>
    );
};

export default AnalyticsCard;
