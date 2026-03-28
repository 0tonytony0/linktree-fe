import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { 
  updateTitle, 
  updateBio, 
  updateLinks, 
  updateShops,
  updateAvatar,
  updateBanner
} from "../store/profileSlice";

import ProfileHeader from "./profile/ProfileHeader";
import LinkManager from "./profile/LinkManager";
import ProfileBanner from "./profile/ProfileBanner";
import ProfileModal from "./profile/ProfileModal";

const Profile = ({ onImageChange, saveHandler }) => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.username);
  const profile = useSelector((state) => state.profile);
  
  const { title, bio, links, shops, avatar, bgColor, customColor } = profile;

  const [bioCharCount, setBioCharCount] = useState(bio?.length || 0);
  const [activeTab, setActiveTab] = useState("link");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemURL, setNewItemURL] = useState("");
  const [newItemImage, setNewItemImage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [itemError, setItemError] = useState("");

  const presetColors = ["#3B312C", "#FFFFFF", "#000000"];

  // Sync char count when bio changes from Redux
  useEffect(() => {
    setBioCharCount(bio?.length || 0);
  }, [bio]);

  // Handle Bio Change
  const handleBioChange = (e) => {
    const text = e.target.value;
    if (text.length <= 80) {
      dispatch(updateBio(text));
    }
  };

  // Modal Controls
  const openModal = useCallback(
    (isEdit = false, index = null) => {
      setIsChecked(false);
      setIsModalOpen(true);
      setIsEditMode(isEdit);
      setEditingIndex(index);

      if (isEdit && index !== null) {
        const currentItems = activeTab === "link" ? links : shops;
        setNewItemName(currentItems[index].name);
        setNewItemURL(currentItems[index].url);
        setNewItemImage(currentItems[index].image || "");
      } else {
        setNewItemName("");
        setNewItemURL("");
        setNewItemImage("");
      }
    },
    [activeTab, links, shops]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingIndex(null);
  }, []);

  // Add or Edit Item
  const addItem = () => {
    if (!newItemName.trim() || !newItemURL.trim()) {
      toast.error("Both name and URL are required!");
      return;
    }

    const newItem = {
      name: newItemName,
      url: newItemURL,
      image: newItemImage,
      active: true,
      clicks: 0,
    };

    const currentItems = activeTab === "link" ? [...links] : [...shops];

    if (isEditMode && editingIndex !== null) {
      currentItems[editingIndex] = newItem;
      toast.success("Item updated! ✨");
    } else {
      const isDuplicate = currentItems.some(
        (item) => item.name === newItem.name && item.url === newItem.url
      );
      if (isDuplicate) {
        toast.warning("Link already exists!");
        return;
      }

      currentItems.push(newItem);
      toast.success("Item added! 🚀");
    }

    if (activeTab === "link") {
      dispatch(updateLinks(currentItems));
    } else {
      dispatch(updateShops(currentItems));
    }

    setIsChecked(true);
    closeModal();
  };

  // Delete Item
  const deleteItem = (index, type) => {
    if (type === "link") {
      dispatch(updateLinks(links.filter((_, i) => i !== index)));
    } else {
      dispatch(updateShops(shops.filter((_, i) => i !== index)));
    }
    toast.info("Item removed.");
  };

  const shareItem = (url) => {
    if (navigator.share) {
      navigator.share({ title: "View this!", url })
        .catch((error) => console.error("Sharing failed", error));
    } else {
      navigator.clipboard.writeText(url);
      toast.info("Link copied to clipboard!");
    }
  };

  const handlePresetColor = (color) => {
    dispatch(updateBanner(color));
  };

  const handleCustomColor = (e) => {
    dispatch(updateBanner(e.target.value));
  };

  const handleItemUrl = (val) => {
    const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/;
    setNewItemURL(val);
    setItemError(urlPattern.test(val) ? "" : "Invalid URL");
  };

  return (
    <div className="profile-container">
      <div className="profile-title">
        <h2>General Information</h2>
      </div>

      <ProfileHeader
        avatar={avatar}
        onImageChange={onImageChange}
        removeImage={() => dispatch(updateAvatar(null))}
        title={title}
        setTitle={(val) => dispatch(updateTitle(val))}
        bio={bio}
        handleBioChange={handleBioChange}
        bioCharCount={bioCharCount}
      />

      <LinkManager
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        links={links}
        shops={shops}
        openModal={openModal}
        deleteItem={deleteItem}
      />

      <ProfileBanner
        bgColor={bgColor}
        avatar={avatar}
        title={title}
        userName={userName}
        presetColors={presetColors}
        handlePresetColor={handlePresetColor}
        customColor={customColor}
        handleCustomColor={handleCustomColor}
        saveHandler={saveHandler}
      />

      {isModalOpen && (
        <ProfileModal
          activeTab={activeTab}
          newItemName={newItemName}
          setNewItemName={setNewItemName}
          newItemURL={newItemURL}
          handleItemUrl={handleItemUrl}
          newItemImage={newItemImage}
          setNewItemImage={setNewItemImage}
          isChecked={isChecked}
          addItem={addItem}
          itemError={itemError}
          closeModal={closeModal}
          shareItem={shareItem}
          deleteItem={deleteItem}
          editingIndex={editingIndex}
          links={links}
          shops={shops}
        />
      )}
    </div>
  );
};

export default Profile;
