import '../styles/header.css';

const Header = () => {
  return (
    <div className="body-header">
      <div className="greeting">
        <h2>Hi, Vaibhav !</h2>
        <p>Congratulations. You got a great response today.</p>
      </div>
      <button className="share-btn">Share</button>
    </div>
  );
};

export default Header;
