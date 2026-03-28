import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import '../styles/layout.css';

const Layout = () => {
    return (
        <div className="layout">
            <Navbar />
            <div className="body-content">
                <Header />
                <div className="page-outlet">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
