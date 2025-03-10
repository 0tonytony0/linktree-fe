import { useSelector } from "react-redux";
import "../styles/header.css";
import { toast } from "react-toastify";

const Header = () => {
  const userName = useSelector((state) => state.user.username);
  const profileId = useSelector((state) => state.user.profileId);

  const handleShare = () => {
    navigator.clipboard
      .writeText(`http://localhost:5173/preview/${profileId}`)
      .then(() => {
        toast.success("Link copied to clipboard!", { autoClose: 2000 });
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  return (
    <div className="body-header">
      <div className="greeting">
        <h2>Hi, {userName} !</h2>
        <p>Congratulations. You got a great response today.</p>
      </div>
      <button className="share-btn" onClick={handleShare}>
        Share
      </button>
    </div>
  );
};

export default Header;
