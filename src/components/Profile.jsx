import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import ProfileHeader from "./profile/ProfileHeader";
import LinkManager from "./profile/LinkManager";
import ProfileBanner from "./profile/ProfileBanner";
import ProfileModal from "./profile/ProfileModal";

const Profile = ({
  avatar,
  setAvatar,
  onImageChange,
  title,
  setTitle,
  links,
  setLinks,
  shops,
  setShops,
  bio,
  setBio,
  bgColor,
  setBgColor,
  customColor,
  setCustomColor,
  saveHandler,
}) => {
  const userName = useSelector((state) => state.user.username);
  const [bioCharCount, setBioCharCount] = useState(bio?.length || 0);
  const [activeTab, setActiveTab] = useState("link");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemURL, setNewItemURL] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [itemError, setItemError] = useState("");

  const presetColors = ["#3B312C", "#FFFFFF", "#000000"];

  // ✅ Bio Handler
  const handleBioChange = (e) => {
    const text = e.target.value;
    if (text.length <= 80) {
      setBio(text);
      setBioCharCount(text.length);
    }
  };

  // ✅ Modal Controls
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
      } else {
        setNewItemName("");
        setNewItemURL("");
      }
    },
    [activeTab, links, shops]
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingIndex(null);
  }, []);

  // ✅ Add or Edit Item
  const addItem = () => {
    if (!newItemName.trim() || !newItemURL.trim()) {
      toast.error("Both name and URL are required!");
      return;
    }

    const newItem = {
      name: newItemName,
      url: newItemURL,
      active: true,
      clicks: 0,
    };

    const currentItems = activeTab === "link" ? [...links] : [...shops];

    if (isEditMode && editingIndex !== null) {
      currentItems[editingIndex] = newItem;
      toast.success("Item updated successfully!");
    } else {
      const isDuplicate = currentItems.some(
        (item) => item.name === newItem.name && item.url === newItem.url
      );
      if (isDuplicate) {
        toast.warning("Item already exists!");
        return;
      }

      currentItems.push(newItem);
      toast.success("Item added successfully!");
    }

    if (activeTab === "link") {
      setLinks(currentItems);
    } else {
      setShops(currentItems);
    }

    setIsChecked(true);
  };

  // ✅ Delete Item
  const deleteItem = (index, type) => {
    if (type === "link") {
      setLinks(links.filter((_, i) => i !== index));
    } else {
      setShops(shops.filter((_, i) => i !== index));
    }
  };

  const shareItem = (url) => {
    if (navigator.share) {
      navigator
        .share({ title: "Check this out!", url })
        .then(() => toast.success("Shared successfully"))
        .catch((error) => console.error("Sharing failed", error));
    } else {
      navigator.clipboard.writeText(url);
      toast.info("Link copied to clipboard!");
    }
  };

  const handlePresetColor = (color) => {
    setBgColor(color);
    setCustomColor(color);
  };

  const handleCustomColor = (e) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    setBgColor(newColor);
  };

  const handleItemUrl = (val) => {
    const urlPattern = /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/;
    setNewItemURL(val);
    setItemError(urlPattern.test(val) ? "" : "Invalid URL");
  };

  return (
    <div className="profile-container">
      <div className="profile-title">
        <h2>Profile</h2>
      </div>

      <ProfileHeader
        avatar={avatar}
        onImageChange={onImageChange}
        removeImage={() => setAvatar(null)}
        title={title}
        setTitle={setTitle}
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
