import React, { memo, useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getDeviceType } from "../utils/helper";
import { updateLinkData } from "../services/profileService";

const MobileSample = ({ isPreview = false }) => {
  const [activeTab, setActiveTab] = useState("link");
  
  // Directly pull all data from Redux for "Global" synchronization
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.user);
  
  const { 
    avatar, 
    styles, 
    title, 
    links, 
    shops, 
    bgColor 
  } = profile;

  const profileId = user.profileId;

  // Apply layout styles
  const getLayoutStyle = () => {
    switch (styles.layout) {
      case "grid":
        return {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          padding: "16px",
        };
      default:
        return {
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "16px",
        };
    }
  };

  const getButtonStyle = (isActive = true) => {
    return {
      "--btn-color": styles.buttonColor || "#28A263",
      "--btn-font-color": styles.buttonFontColor || "#ffffff",
      fontFamily: styles.font || "Poppins",
      opacity: isActive ? 1 : 0.6,
      transition: "all 0.25s ease",
    };
  };

  const handleShare = () => {
    const url = `${window.location.origin}/${user.username}`;
    if (navigator.share) {
      navigator.share({ title: "View my Spark!", url })
        .catch(() => toast.error("Sharing failed."));
    } else {
      navigator.clipboard.writeText(url)
        .then(() => toast.success("Link copied! 🔗"))
        .catch(() => toast.error("Failed to copy link."));
    }
  };

  const handleItemClick = async (item, type) => {
    if (!isPreview) return; // Only track clicks in preview mode
    
    const isLink = type === "link";
    const device = getDeviceType();
    try {
      await updateLinkData(item?._id, device, isLink);
      window.open(item.url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("Traffic tracking failed", err);
    }
  };

  const currentItems = activeTab === "link" ? links : shops;

  return (
    <div className={`mobile-sample-wrapper ${isPreview ? "is-preview" : ""}`}>
      <div 
        className="mobile-device"
        style={{ backgroundColor: styles.backgroundColor || "#ffffff" }}
      >
        {/* Notch */}
        <div className="device-notch"></div>

        {/* Header Background */}
        <div className="mobile-header-bg" style={{ backgroundColor: bgColor || "#28A263" }}>
          <button className="mobile-share-btn" onClick={handleShare}>
            <FaShareAlt />
          </button>
          
          <div className="mobile-profile-info">
            <img
              src={avatar || "/images/avatar.svg"}
              alt="Avatar"
              className="mobile-avatar"
            />
            <h2 style={{ fontFamily: styles.font }}>{title || "@username"}</h2>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="mobile-tabs">
          <button
            className={`mobile-tab-btn ${activeTab === "link" ? "active" : "inactive"} ${styles.buttonStyle || "fill-rounded"}`}
            onClick={() => setActiveTab("link")}
            style={getButtonStyle(activeTab === "link")}
          >
            Links
          </button>
          <button
            className={`mobile-tab-btn ${activeTab === "shop" ? "active" : "inactive"} ${styles.buttonStyle || "fill-rounded"}`}
            onClick={() => setActiveTab("shop")}
            style={getButtonStyle(activeTab === "shop")}
          >
            Shop
          </button>
        </div>

        {/* Content Area */}
        <div className="mobile-content-scroll" style={getLayoutStyle()}>
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <div
                key={index}
                className={`mobile-link-card ${item.image ? "has-image" : ""} ${styles.layout === 'grid' ? 'is-grid' : ''} ${styles.buttonStyle || "fill-rounded"}`}
                style={{
                  ...getButtonStyle(),
                  opacity: item.active !== false ? 1 : 0.5,
                }}
                onClick={() => handleItemClick(item, activeTab)}
              >
                {item.image && (
                  <div className="card-thumb">
                    <img src={item.image} alt="" />
                  </div>
                )}
                <div className="card-info">
                  <span style={{ color: styles.buttonFontColor }}>{item.name}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-content">No {activeTab}s added yet.</div>
          )}
        </div>

        {/* Footer */}
        <div className="mobile-device-footer">
          <button style={getButtonStyle()} className={`mobile-connect-btn ${styles.buttonStyle || "fill-rounded"}`}>
            Get Connected
          </button>
          <div className="spark-brand">SPARK</div>
        </div>
      </div>
    </div>
  );
};

export default memo(MobileSample);
