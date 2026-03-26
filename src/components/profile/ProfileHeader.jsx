import React from "react";

const ProfileHeader = ({ avatar, onImageChange, removeImage, title, setTitle, bio, handleBioChange, bioCharCount }) => {
  return (
    <div className="profile-description">
      <div className="profile-header">
        <img src={avatar || "/images/avatar.svg"} alt="Avatar" className="avatar" />
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
        <div className="text-right text-xs text-gray-400 mt-1">{bioCharCount}/80</div>
      </div>
    </div>
  );
};

export default ProfileHeader;
