import React, { useCallback, useEffect, useState } from "react";
import "../styles/main.css";
import MobileSample from "../components/MobileSample";
import Appearance from "../components/Appearance";
import Profile from "../components/Profile";
import AnalyticsPage from "../components/AnalyticsPage";
import { useLocation } from "react-router-dom";
import { TAB_LINKS } from "./../utils/constants";
import "../styles/mobilesample.css";
import "../styles/profile.css";
import "../styles/appearance.css";
import "../styles/settings.css";
import { uploadImage } from "../services/uploadServices";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../services/profileService";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import { toast } from "react-toastify";
import Settings from './../components/Settings';

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [avatar, setAvatar] = useState(null);
  const [currentTab, setCurrentTab] = useState("");
  const location = useLocation();

  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([]);
  const [shops, setShops] = useState([]);
  const [isChecked2, setIsChecked2] = useState(false);
  const [bgColor, setBgColor] = useState("#3B312C"); // Default background color
  const [customColor, setCustomColor] = useState("#000000");
  const [isProfileData, setIsProfileData] = useState(false);
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

  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (file) {
      }
      const imageData = await uploadImage(file);
      setAvatar(imageData.imageUrl);
    } catch (err) {
      console.log(err);
    }
  };

  const saveHandler = async (e) => {
    e.preventDefault();
    console.log({ links });

    const formData = {
      title: title,
      bio: bio,
      links: links,
      shops: shops,
      banner: customColor,
      appreance: { ...styles },
      avatar: avatar || "",
    };

    try {
      if (!isProfileData) {
        await createProfile(formData);
        toast.success("successfully saved !");
      } else {
        await updateProfile(formData);
        toast.success("successfully saved !");
      }
      console.log({ formData });
    } catch (error) {
      toast.error("Failed to save. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        const profileData = profile.profile;
        setTitle(profileData.title);
        setBio(profileData.bio);
        setCustomColor(profileData.banner);
        setBgColor(profileData.banner);
        setLinks(profileData.links);
        setShops(profileData.shops);
        setStyles(profileData.appreance);
        setAvatar(profileData.avatar);
        dispatch(setUser({ ...user, profileId: profileData._id }));
        setIsProfileData(true);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);
  console.log({ links });
  const updateLinkClick = useCallback((linkId, isLink) => {
    if (isLink) {
      setLinks((prev) =>
        prev.map((linkData) => {
          if (linkData?._id === linkId) {
            return { ...linkData, clicks: linkData.clicks + 1 };
          }
          return linkData;
        })
      );
    } else {
      setShops((prev) =>
        prev.map((shopData) => {
          if (shopData?._id === linkId) {
            return { ...shopData, clicks: shopData.clicks + 1 };
          }
          return shopData;
        })
      );
    }
  }, []);

  return (
    <>
      {(currentTab === TAB_LINKS.LINKS ||
        // !currentTab ||
        currentTab === TAB_LINKS.APPEARANCE) && (
        <div className="main-content">
          <MobileSample
            avatar={avatar}
            styles={styles}
            title={title}
            links={links}
            shops={shops}
            bgColor={bgColor}
            updateLinkClick={updateLinkClick}
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
                bio={bio}
                setBio={setBio}
                saveHandler={saveHandler}
                // isChecked2={isChecked2}
                setIsChecked2={setIsChecked2}
              />
            )}

            {/* Appearance Section (Pass styles + setStyles to allow modifications) */}
            {currentTab === TAB_LINKS.APPEARANCE && (
              <Appearance
                styles={styles}
                setStyles={setStyles}
                saveHandler={saveHandler}
              />
            )}
          </div>
        </div>
      )}

      <div>
        {currentTab === TAB_LINKS.ANALYTICS && <AnalyticsPage />}
        {currentTab === TAB_LINKS.SETTINGS && <Settings />}
      </div>
    </>
  );
};

export default Main;
