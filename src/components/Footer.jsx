import React from "react";
import { AiOutlineArrowRight, AiOutlineLinkedin, AiOutlineGithub } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-info">
                    <h3>Contact Us</h3>
                    <p>hello@myspark.com</p>
                    <p>+1 234 567 890</p>
                    <p style={{ marginTop: '1rem', color: '#0000007f' }}>Website by SPARK Team © 2026</p>
                </div>

                <div className="footer-btns">
                    <button style={{ background: '#000000', color: '#fff', padding: '14px 28px', marginBottom: '1rem', border: 'none', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '800' }}>
                        View the plan <AiOutlineArrowRight />
                    </button>
                    <button style={{ background: '#fff', border: '2px solid #000000', color: '#000000', padding: '14px 28px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '800' }}>
                        Speak to our team <AiOutlineArrowRight />
                    </button>
                </div>
            </div>

            <h1 className="footer-main-text">SHAPING OUR OWN FUTURE</h1>

            <div className="footer-badges">
                <div className="badge">Youth</div>
                <div className="badge">Growth</div>
                <div className="badge : badge-white">Net Zero</div>
                <div className="badge">Place</div>
                <div className="badge : badge-white">Scale</div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '6rem', fontSize: '2.5rem', color: '#000000' }}>
                <Link to="#"><AiOutlineLinkedin /></Link>
                <Link to="#"><AiOutlineGithub /></Link>
            </div>
        </footer>
    );
};

// Simplified Link wrapper for Footer logic (internal usage)
const Link = ({ children, to }) => <a href={to} style={{ color: 'inherit' }}>{children}</a>;

export default Footer;
