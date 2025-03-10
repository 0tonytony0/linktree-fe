import { useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import {
  AiOutlineHome,
  AiOutlineBgColors,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const userName = useSelector((state) => state.user.username);

  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("links");

  // Update active tab on location changea
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setActiveTab(params.get("tab") || "links");
  }, [location]);

  const navLinks = [
    { tab: "links", label: "Links", icon: <AiOutlineHome /> },
    { tab: "appearance", label: "Appearance", icon: <AiOutlineBgColors /> },
    { tab: "analytics", label: "Analytics", icon: <AiOutlineBarChart /> },
    { tab: "settings", label: "Settings", icon: <AiOutlineSetting /> },
  ];

  // Handle navigation and set active tab
  const handleNavClick = (tab) => {
    navigate(`/main?tab=${tab}`);
    setActiveTab(tab);
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src="images/spark.svg" alt="Spark Logo" className="logo-image" />
      </div>

      {/* Sidebar Links */}
      <nav className="navbar-links">
        {navLinks?.map((link) => (
          <div
            key={link.tab}
            className={`nav-link ${activeTab === link.tab ? "active" : ""}`}
            onClick={() => handleNavClick(link.tab)}
          >
            {link.icon} {link.label}
          </div>
        ))}
      </nav>

      {/* Username at the Bottom */}
      <div className="navbar-user">
        <AiOutlineUser className="user-icon" />
        <span>{userName}</span>
      </div>
    </div>
  );
};

export default Navbar;
