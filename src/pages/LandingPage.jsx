import React, { useEffect,useRef } from "react";
import "./LandingPage.css";
import AnalyticsCard from "../components/AnalyticsCard";
import InfoCard from "../components/InfoCard.jsx";
import ContentCard from "../components/ContentCard.jsx";
import TestimonialCard from "../components/TestimonialCard.jsx";
import IntegrationCard from './../components/IntregrationCard';
import Footer from './../components/Footer';
import { Link } from 'react-router-dom';


const LandingPage = () => {

const InfoRef = useRef()

useEffect(() => {
  if (InfoRef.current) {
    InfoRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}, [])

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="header" ref={InfoRef} >
        <div className="logo-container">
          <img src="images/logo.svg" alt="SPARK Logo" className="logo-icon" />
          {/* <span className="logo-text">SPARK | Marketplace</span> */}
        </div>
        <Link to="/signup">
          <button className="sign-up">Sign up free</button>
        </Link>
      </header>


      {/* Info Section */}
      <section className="info-section">
        <InfoCard
          title="The easiest place to update and share your Connection"
          description="Help your followers discover everything you're sharing all over the internet, in one simple place. They'll thank you for it!Help your followers discover everything you're sharing in one place. It's so simple, plus, they'll thank you for it! "
          buttonText="Get your free Spark"
          image="images/preview1.svg"
          // refProps={InfoRef}
        />
      </section>

      {/* Analytics Section */}
      <section className="analytics">
        <AnalyticsCard
          title="Analyze your audience and keep your followers engaged"
          description="Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly to keep them coming back. "
          image="images/analyze.svg"
        />
      </section>

      {/* Content Sharing Section */}
      <section className="content-sharing">
        <ContentCard
          title="Share limitless content in limitless ways"
          description="Connect your content in all its forms and help followers find more of what they're looking for. 
          Your TikToks, Tweets, YouTube videos, music, articles, recipes, podcasts and more… It all comes together in one powerful place"
          image="images/content.svg"
        />
      </section>

      {/* Testimonials Section */}
      <TestimonialCard />

      {/* Integrations Section */}
      <IntegrationCard />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
