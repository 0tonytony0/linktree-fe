import React from "react";
import "./LandingPage.css";
import AnalyticsCard from "../components/AnalyticsCard";
import InfoCard from "../components/InfoCard.jsx";
import ContentCard from "../components/ContentCard.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import IntegrationCard from './../components/IntregrationCard';
import Footer from './../components/Footer';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Header - Transparent/Dark Over Image Look */}
      <header className="header" >
        <div className="logo-container">
          <img src="images/logo.svg" alt="SPARK Logo" className="logo-icon" />
        </div>
        <Link to="/signup">
          <button className="sign-up">Sign up free</button>
        </Link>
      </header>


      {/* Main Sections - Restored & Centered Reference Layout */}
      <section className="info-section">
        <InfoCard
          title={<>The easiest place to update and share your <span>Connection</span></>}
          description="Help your followers discover everything you're sharing in one place. It's so simple, plus, they'll thank you for it!"
          buttonText="Get your free Spark"
          image="images/preview1.svg"
        />
      </section>

      <div className="section-divider"></div>

      <section className="analytics">
        <AnalyticsCard
          title={<>Analyze your audience and keep your followers <span>Engaged</span></>}
          description="Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly."
          image="images/analyze.svg"
        />
      </section>

      <div className="section-divider"></div>

      <section className="content-sharing">
        <ContentCard
          title={<>Share limitless content in <span>Limitless Ways</span></>}
          description="Connect your content in all its forms and help followers find more of what they're looking for. TikToks, YouTube, articles, and more."
          image="images/content.svg"
        />
      </section>

      <div className="section-divider"></div>

      <TestimonialCard />

      <div className="section-divider"></div>

      {/* Integrations - Centered Grid Look */}
      <IntegrationCard title={<>Our <span>Integrations</span></>} />

      <Footer />
    </div>
  );
};

export default LandingPage;
