import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import {
  AiOutlineHome,
  AiOutlineBgColors,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import { useSelector } from "react-redux";

const navLinks = [
  { path: "/main/links", label: "Links", icon: <AiOutlineHome /> },
  { path: "/main/appearance", label: "Appearance", icon: <AiOutlineBgColors /> },
  { path: "/main/analytics", label: "Analytics", icon: <AiOutlineBarChart /> },
  { path: "/main/settings", label: "Settings", icon: <AiOutlineSetting /> },
];

const Navbar = () => {
  const userName = useSelector((state) => state.user.username);

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <img src="/images/spark.svg" alt="Spark Logo" className="logo-image" />
      </div>

      {/* Sidebar Links */}
      <nav className="navbar-links">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Username at Bottom */}
      <div className="navbar-user">
        <AiOutlineUser className="user-icon" />
        <span>{userName || "Profile"}</span>
      </div>
    </div>
  );
};

export default Navbar;
