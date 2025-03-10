import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/forgot-password.css";
import MobileSample from "../components/MobileSample";
import { getProfileFromId } from "../services/profileService";

const Preview = () => {
  const { profileId } = useParams();
  const [avatar, setAvatar] = useState();
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
  const [title, setTitle] = useState("");
  const [links, setLinks] = useState([]);
  const [shops, setShops] = useState([]);
  const [bgColor, setBgColor] = useState("#3B312C"); // Default background color

  useEffect(() => {
    const fetchProfileData = async () => {
      const profile = await getProfileFromId(profileId);
      const profileData = profile.profile;
      setAvatar(profileData.avatar);
      setTitle(profileData.title);
      setBgColor(profileData.banner);
      setLinks(profileData.links);
      setShops(profileData.shops);
      setStyles(profileData.appreance);
    };

    fetchProfileData();
  }, [profileId]);

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
    <div className="">
      <MobileSample
        avatar={avatar}
        styles={styles}
        title={title}
        links={links}
        shops={shops}
        bgColor={bgColor}
        updateLinkClick={updateLinkClick}
      />
    </div>
  );
};

export default Preview;
