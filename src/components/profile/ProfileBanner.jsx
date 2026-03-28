import React from "react";

const ProfileBanner = ({ 
  bgColor, 
  avatar, 
  title, 
  userName, 
  presetColors, 
  handlePresetColor, 
  customColor, 
  handleCustomColor, 
  saveHandler 
}) => {
  return (
    <div className="banner-section">
      <h2>Profile Banner</h2>
      <div className="banner-container">
        {/* Banner Live Preview */}
        <div className="banner" style={{ backgroundColor: bgColor }}>
          <img
            src={avatar || "/images/avatar.svg"}
            alt="Avatar"
            className="b-avatar"
          />
          <h3 className="b-username">{title || "@username"}</h3>
          <p className="handle">spark.me/{userName || "username"}</p>
        </div>

        {/* Custom Background Color Section */}
        <div className="color-picker-section">
          <h4>Background Color</h4>

          {/* Preset Colors */}
          <div className="preset-colors">
            {presetColors.map((color, index) => (
              <div
                key={index}
                className={`color-circle ${bgColor === color ? "active" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => handlePresetColor(color)}
                title={color}
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
              placeholder="#000000"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="save-container">
        <button className="save-button" onClick={saveHandler}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileBanner;
