import React from "react";

const AnalyticsCard = ({ title, description, image }) => {
    return (
        <div className="grid-container">
            <div className="analytics-text" style={{ gridColumn: '1 / -1', marginBottom: '40px' }}>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <div className="analytics-image" style={{ gridColumn: '1 / -1' }}>
                <img src={image} alt="Analytics Tracking" />
            </div>
        </div>
    );
};

export default AnalyticsCard;
