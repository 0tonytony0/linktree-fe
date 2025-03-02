import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-buttons">
                    <Link to="/login">
                        <button className="login-btn">Log in</button>
                    </Link>
                    <Link to="/signup">
                        <button className="signup-btn">Sign up free</button>
                    </Link>
                </div>
                <div className="footer-links">
                    <div>
                        <p>About Spark</p>
                        <p>Blog</p>
                        <p>Press</p>
                        <p>Social Good</p>
                        <p>Contact</p>
                    </div>
                    <div>
                        <p>Careers</p>
                        <p>Getting Started</p>
                        <p>Features and How-Tos</p>
                        <p>FAQs</p>
                        <p>Report a Violation</p>
                    </div>
                    <div>
                        <p>Terms and Conditions</p>
                        <p>Privacy Policy</p>
                        <p>Cookie Notice</p>
                        <p>Trust Center</p>
                    </div>
                </div>
            </div>

            <div className='bottom'>
                <p className="acknowledgment">
                    Built with passion, powered by ideas, and driven by community.
                    This space is more than just a website. It's where connections spark, creativity flows, and possibilities grow.
                    Thanks for being part of the journey!      </p>

                {/* Replace with appropriate social media icons */}

                <div className="social-icons">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="icons/twitter.svg" alt="Twitter" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="icons/instagram.svg" alt="Instagram" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <img src="icons/youtube.svg" alt="YouTube" />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <img src="icons/tiktok.svg" alt="TikTok" />
                    </a>
                    <a href="https://spark.com" target="_blank" rel="noopener noreferrer">
                        <img src="icons/spark.svg" alt="Spark" />
                    </a>
                </div>

            </div>

        </footer>
    );
};

export default Footer;
