import React, { useEffect, useState } from "react";
import "../styles/main.css";
import MobileSample from "../components/MobileSample";
import Appearance from "../components/Appearance";
import Profile from "../components/Profile";
import Settings from "../components/settings";
import { useLocation } from "react-router-dom";
import { TAB_LINKS } from "./../utils/constants";
import "../styles/mobilesample.css";
import "../styles/profile.css";
import "../styles/appearance.css";
import "../styles/settings.css";

const Main = () => {
  const [avatar, setAvatar] = useState(null);
  const [currentTab, setCurrentTab] = useState("");
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [links, setLinks] = useState([]);
  const [shops, setShops] = useState([]);
  const [bgColor, setBgColor] = useState("#3B312C"); // Default background color
  const [customColor, setCustomColor] = useState("#000000");
  // Store styles that will be modified through Appearance.jsx
  const [styles, setStyles] = useState({
    layout: "stack",
    buttonStyle: "",
    buttonColor: "#28A263",
    buttonFontColor: "#ffffff",
    font: "Poppins",
    fontColor: "#000000",
    theme: "air-snow",
    backgroundColor: "#ffffff",
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setCurrentTab(params.toString().split("tab=")[1]);
  }, [location.search]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  return (
    <>
      {(currentTab === TAB_LINKS.LINKS ||
        // !currentTab ||
        currentTab === TAB_LINKS.APPEARANCE) && (
        <div className="main-content">
          {/* Pass styles to MobileSample so it updates dynamically */}

          <MobileSample
            avatar={avatar}
            styles={styles}
            title={title}
            links={links}
            shops={shops}
            bgColor={bgColor}
          />

          <div className="link-details">
            {/* Profile Section */}
            {(currentTab === TAB_LINKS.LINKS || !currentTab) && (
              <Profile
                avatar={avatar}
                setAvatar={setAvatar}
                onImageChange={handleImageChange}
                title={title}
                setTitle={setTitle}
                links={links}
                setLinks={setLinks}
                shops={shops}
                setShops={setShops}
                bgColor={bgColor}
                setBgColor={setBgColor}
                customColor={customColor}
                setCustomColor={setCustomColor}
              />
            )}

            {/* Appearance Section (Pass styles + setStyles to allow modifications) */}
            {currentTab === TAB_LINKS.APPEARANCE && (
              <Appearance styles={styles} setStyles={setStyles} />
            )}
          </div>
        </div>
      )}

      <div>
        {currentTab === TAB_LINKS.ANALYTICS && <>test</>}
        {currentTab === TAB_LINKS.SETTINGS && <Settings />}
      </div>
    </>
  );
};

export default Main;
