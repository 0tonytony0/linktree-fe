import React, { useEffect, useState } from "react";

const IntegrationCard = () => {
  const [integrations, setIntegrations] = useState([]);

  useEffect(() => {
    fetch("/data/integrations.json") // Ensure JSON is in `public/`
      .then((res) => res.json())
      .then((data) => setIntegrations(data));
  }, []);

  return (
    <section className="integration-section">
      <h1>All Link Apps and Integrations</h1>
      <div className="integration-grid">
        {integrations.map((integration, index) => (
          <div key={index} className="integration-card">
            <img src={integration.icon} alt={integration.name} />
            <div className="integration-text">
              <h3>{integration.name}</h3>
              <p>{integration.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntegrationCard;
