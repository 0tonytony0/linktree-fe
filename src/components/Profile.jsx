import React, { useState, useCallback } from "react";
import { FaLink, FaStore, FaShareAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

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
  bgColor,
  setBgColor,
  customColor,
  setCustomColor,
}) => {
  const [bio, setBio] = useState("");
  const [bioCharCount, setBioCharCount] = useState(0);
  const [activeTab, setActiveTab] = useState("link");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemURL, setNewItemURL] = useState("");
  const [isChecked, setIsChecked] = useState(false);
 

  const presetColors = ["#3B312C", "#FFFFFF", "#000000"];

  // ✅ Avatar Handlers

  const removeImage = () => setAvatar(null);

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
    if (!newItemName.trim() || !newItemURL.trim()) return;

    const newItem = {
      name: newItemName,
      url: newItemURL,
      active: true,
      clicks: 0,
    };
    const currentItems = activeTab === "link" ? links : shops;

    if (isEditMode && editingIndex !== null) {
      currentItems[editingIndex] = newItem;
    } else {
      const isDuplicate = currentItems.some(
        (item) => item.name === newItem.name && item.url === newItem.url
      );
      if (isDuplicate) return alert("Item already exists.");
      currentItems.push(newItem);
    }

    activeTab === "link"
      ? setLinks([...currentItems])
      : setShops([...currentItems]);
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
        .share({
          title: "Check this out!",
          url: url,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Sharing failed", error));
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const handlePresetColor = (color) => {
    setBgColor(color);
    setCustomColor(color); // Sync custom input with selected color
  };

  const handleCustomColor = (e) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    setBgColor(newColor);
  };

  return (
    <div className="profile-container">
      <div className="profile-title">
        <h2>Profile</h2>
      </div>

      {/* Profile Header */}
      <div className="profile-description">
        <div className="profile-header">
          <img src={avatar || "/images/avatar.svg"} alt="" className="avatar" />
          <div className="img-selection">
            <input
              type="file"
              onChange={onImageChange}
              className="hidden"
              id="avatarUpload"
            />
            <label htmlFor="avatarUpload" className="pick-image">
              <p>Pick an image</p>
            </label>
            <button onClick={removeImage} className="remove-img">
              Remove
            </button>
          </div>
        </div>

        <div className="profile-content">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            placeholder="Profile Title"
          />
          <textarea
            value={bio}
            onChange={handleBioChange}
            className="input-field"
            placeholder="Bio"
            rows="3"
          ></textarea>
          <div className="text-right">{bioCharCount}/80</div>
        </div>
      </div>

      {/* LINKS & SHOPS */}
      <div className="links-section">
        <div className="toggle-slider-container">
          <button
            className={`slider-btn ${activeTab === "link" ? "active" : ""}`}
            onClick={() => setActiveTab("link")}
          >
            <FaLink /> Add Link
          </button>
          <button
            className={`slider-btn ${activeTab === "shop" ? "active" : ""}`}
            onClick={() => setActiveTab("shop")}
          >
            <FaStore /> Add Shop
          </button>
        </div>

        <button className="add-btn" onClick={() => openModal(false)}>
          + Add
        </button>

        {/* LIST CONTAINER */}
        <div className="list-container">
          {(activeTab === "link" ? links : shops).map((item, index) => (
            <div key={index} className="list-item">
              <div className="item-details">
                <p className="item-title">
                  {item.name}{" "}
                  <span
                    className="edit-icon"
                    onClick={() => openModal(true, index)}
                  >
                    ✏️
                  </span>
                </p>
                <p className="item-url">
                  {item.url}{" "}
                  <span
                    className="edit-icon"
                    onClick={() => openModal(true, index)}
                  >
                    ✏️
                  </span>
                </p>
                <p className="click-stats">📊 {item.clicks} clicks</p>
              </div>
              <div className="item-actions">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={true} // Default ON
                    onChange={() => {}} // Add logic if needed
                  />
                  <span className="slider"></span>
                </label>
                <MdDelete
                  className="delete-icon"
                  onClick={() => deleteItem(index, activeTab)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="banner-section">
        <h2>Banner</h2>
        <div className="banner-container">
          {/* Banner Section */}
          <div className="banner" style={{ backgroundColor: bgColor }}>
            <img
              src={avatar || "/images/avatar.svg"}
              alt=""
              className="b-avatar"
            />
            <h3 className="b-username">{title}</h3>
            <p className="handle">🔥/Shadow Monarch</p>
          </div>

          {/* Custom Background Color Section */}
          <div className="color-picker-section">
            <h4>Custom Background Color</h4>

            {/* Preset Colors */}
            <div className="preset-colors">
              {presetColors.map((color, index) => (
                <div
                  key={index}
                  className="color-circle"
                  style={{ backgroundColor: color }}
                  onClick={() => handlePresetColor(color)}
                ></div>
              ))}
            </div>

            {/* Color Input */}
            <div className="custom-color-input">
              <input
                type="color"
                value={customColor}
                onChange={handleCustomColor}
              />
              <input
                type="text"
                value={customColor}
                onChange={handleCustomColor}
              />
            </div>
          </div>
        </div>
        {/* Save Button */}
        <button className="save-button">Save</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header-toggle">
              <button
                className={`modal-tab ${activeTab === "link" ? "active" : ""}`}
                // onClick={() => setActiveTab('link')}
              >
                <i className="fas fa-link"></i> Add Link
              </button>
              <button
                className={`modal-tab ${activeTab === "shop" ? "active" : ""}`}
                // onClick={() => setActiveTab('shop')}
              >
                <i className="fas fa-store"></i> Add Shop
              </button>
            </div>

            {/* Input Fields */}
            <div className="input-group-1">
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="m-input-field"
                placeholder={`${activeTab === "link" ? "Link" : "Shop"} Title`}
              />

              {/* ✅ Toggle ON/OFF for Adding Link */}
              <div className="add-to-container">
                {/* <label>Add to {activeTab === 'link' ? 'Links' : 'Shops'}:</label> */}
                <label className="m-switch">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={addItem}
                    disabled={isChecked}
                  />
                  <span className="m-slider"></span>
                </label>
              </div>
            </div>

            <div className="input-group-2">
              <input
                type="text"
                value={newItemURL}
                onChange={(e) => setNewItemURL(e.target.value)}
                className="m-input-field"
                placeholder={`${activeTab === "link" ? "Link" : "Shop"} URL`}
              />

              {/* ✅ Share & Delete Buttons */}
              <div className="action-icons">
                <FaShareAlt
                  className="icon-share"
                  onClick={() => shareItem(newItemURL)}
                />
                <MdDelete
                  className="icon-delete"
                  onClick={() => {
                    if (editingIndex === null) {
                      // Try finding the item based on newItemName & newItemURL
                      const currentItems = activeTab === "link" ? links : shops;
                      const itemIndex = currentItems.findIndex(
                        (item) =>
                          item.name === newItemName && item.url === newItemURL
                      );

                      if (itemIndex !== -1) {
                        deleteItem(itemIndex, activeTab);
                        closeModal();
                      } else {
                        alert("Item not found or not in edit mode.");
                      }
                    } else {
                      deleteItem(editingIndex, activeTab);
                      closeModal();
                    }
                  }}
                />
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="modal-buttons">
              <button className="m-ok-btn" onClick={closeModal}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
