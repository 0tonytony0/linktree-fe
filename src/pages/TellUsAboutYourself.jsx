import React, { useState } from 'react';
import './TellUsAboutYourself.css';
import sparkLogo from '../assets/spark-logo.svg';
import rightImage from '../assets/welcome2.jpeg';
import { useNavigate } from 'react-router-dom';

const TellUsAboutYourself = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = [
        { label: '💼 Business' },
        { label: '🎨 Creative' },
        { label: '📚 Education' },
        { label: '🎵 Entertainment' },
        { label: '🧪 Fashion & Beauty' },
        { label: '🍕 Food & Beverage' },
        { label: '⚖️ Government & Politics' },
        { label: '🍎 Health & Wellness' },
        { label: '💖 Non-Profit' },
        { label: '💟 Other' },
        { label: '💻 Tech' },
        { label: '✈️ Travel & Tourism' }
    ];

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const handleContinue = () => {
        if (!username || !selectedCategory) {
            alert('Please enter a username and select a category.');
            return;
        }

        navigate('/main')
        // Navigate to next page or send data to backend
        console.log('Username:', username);
        console.log('Selected Category:', selectedCategory);
    };

    return (
        <>
          <div className="about-container">
            <div className="left-section">
                <img src={sparkLogo} alt="Spark Logo" className="logo" />
                <div className='left-section-main'>

                    <h1>Tell us about yourself</h1>
                    <p>For a personalized Spark experience</p>

                    <input
                        type="text"
                        placeholder="Tell us your username"
                        className="username-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <p className="category-text">Select one category that best describes your Linktree :</p>

                    <div className="categories">
                        {categories.map((cat) => (
                            <button
                                key={cat.label}
                                className={`category ${selectedCategory === cat.label ? 'active' : ''}`}
                                onClick={() => handleCategoryClick(cat.label)} >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <button className="continue-btn" onClick={handleContinue}>
                        Continue
                    </button>
                </div>
            </div>

            {/* <div className="right-section">
                <img src={rightImage} alt="Right Section" />
            </div> */}
        </div>
        </>
    );
};

export default TellUsAboutYourself;
