import React from "react";

const ProfileBanner = ({ bgColor, avatar, title, userName, presetColors, handlePresetColor, customColor, handleCustomColor, saveHandler }) => {
  return (
    <div className="banner-section">
      <h2>Banner</h2>
      <div className="banner-container">
        {/* Banner Live Preview */}
        <div className="banner" style={{ backgroundColor: bgColor }}>
          <img
            src={avatar || "/images/avatar.svg"}
            alt="Avatar"
            className="b-avatar"
          />
          <h3 className="b-username">{title}</h3>
          <p className="handle">🔥/{userName || "username"}</p>
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
              className="text-input"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button className="save-button" onClick={saveHandler}>
        Save
      </button>
    </div>
  );
};

export default ProfileBanner;
