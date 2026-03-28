import React, { useCallback, useEffect, useState } from "react";
import "../styles/main.css";
import MobileSample from "../components/MobileSample";
import Appearance from "../components/Appearance";
import Profile from "../components/Profile";
import { useLocation } from "react-router-dom";
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
import { setProfileData, updateAvatar } from "../store/profileSlice";
import { toast } from "react-toastify";

const Main = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const profile = useSelector((state) => state.profile);
  const location = useLocation();

  // Determine which sub-tab from path
  const isAppearance = location.pathname.includes("appearance");

  // Fetch profile once on mount (only if not already loaded)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        const profileData = res.profile;
        if (profileData) {
          dispatch(setProfileData({
            title: profileData.title,
            bio: profileData.bio,
            links: profileData.links,
            shops: profileData.shops,
            banner: profileData.banner,
            appreance: profileData.appreance,
            avatar: profileData.avatar,
          }));
          dispatch(setUser({ ...user, profileId: profileData._id }));
        }
      } catch (err) {
        // Silently handle new users who have no profile yet
        console.warn("No profile found yet. New user.");
      }
    };

    if (user.isAuthenticated && !profile.isProfileData) {
      fetchProfile();
    }
  }, [dispatch, user.isAuthenticated, profile.isProfileData, user]);

  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      
      const toastId = toast.loading("Uploading image...");
      const imageData = await uploadImage(file);
      dispatch(updateAvatar(imageData.imageUrl));
      toast.update(toastId, { render: "Image uploaded! 🖼️", type: "success", isLoading: false, autoClose: 2000 });
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  const saveHandler = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const formData = {
      title: profile.title,
      bio: profile.bio,
      links: profile.links,
      shops: profile.shops,
      banner: profile.customColor,
      appreance: { ...profile.styles },
      avatar: profile.avatar || "",
    };

    try {
      const toastId = toast.loading("Saving changes...");
      if (!profile.isProfileData) {
        await createProfile(formData);
        toast.update(toastId, { render: "Profile created! 🎉", type: "success", isLoading: false, autoClose: 3000 });
      } else {
        await updateProfile(formData);
        toast.update(toastId, { render: "Changes saved! ✨", type: "success", isLoading: false, autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Failed to save changes. Please try again.");
    }
  };

  return (
    <div className="main-content">
      {/* Mobile Preview Panel */}
      <MobileSample />

      <div className="link-details">
        {!isAppearance && (
          <Profile
            onImageChange={handleImageChange}
            saveHandler={saveHandler}
          />
        )}

        {isAppearance && (
          <Appearance
            saveHandler={saveHandler}
          />
        )}
      </div>
    </div>
  );
};

export default Main;
