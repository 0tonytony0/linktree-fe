import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Main from '../pages/Main'
import '../styles/layout.css';

const Layout = () => {
    const [activeTab, setActiveTab] = useState('Links'); // Default active tab
    const location = useLocation();
    const navigate = useNavigate();

    // Function to handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        navigate('/main'); // Keeps all links under '/main'
    };

    return (
        <div className="layout">
            <div>
                <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
            </div>
            <div className="body-content">
                <Header />
                <Main>                    {/* Pass activeTab to dynamically change body content */}
                    <Outlet context={{ activeTab }} />
                </Main>
            </div>
        </div>
    );
};

export default Layout;
