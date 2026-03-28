import { useSelector } from "react-redux";
import "../styles/header.css";
import { toast } from "react-toastify";
import { logout } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userName = useSelector((state) => state.user.username);
  const profileId = useSelector((state) => state.user.profileId);

  const handleShare = () => {
    const publicUrl = `${window.location.origin}/${userName}`;
    
    if (navigator.share) {
      navigator.share({
        title: "Check out my Spark profile!",
        url: publicUrl,
      }).catch((err) => console.log("Share failed:", err));
    } else {
      navigator.clipboard.writeText(publicUrl)
        .then(() => {
          toast.success("Link copied to clipboard! 🔗", { autoClose: 2000 });
        })
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
    toast.info("Logged out successfully. See you soon! 👋");
  };

  return (
    <div className="body-header">
      <div className="greeting">
        <h2>Hi, {userName} !</h2>
        <p>Congratulations. You got a great response today.</p>
      </div>
      <div className="header-actions">
        <button className="share-btn" onClick={handleShare}>
          Share
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
