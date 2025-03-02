import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";

const MobileSample = ({
  avatar,
  styles,
  title,
  links,
  shops,
  bgColor,
}) => {
  const [activeTab, setActiveTab] = useState("link");

  // Apply layout styles
  const getLayoutStyle = () => {
    switch (styles.layout) {
      case "grid":
        return {
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))", // Ensures two equal columns
          gap: "7px",
          backgroundColor: styles.backgroundColor,
          overflowY: "auto",
          overflowX: "hidden", // Prevents horizontal scroll
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE and Edge
        };
      case "carousel":
        return {
          display: "flex",
          overflowX: "auto",
          backgroundColor: styles.backgroundColor,
          gap: "7px",
          width: "100%"
        };
      default:
        return {}; // Default stack layout
    }
    
  };

  const getButtonStyle = () => {
    switch (styles.buttonStyle) {
      // Fill Buttons
      case "fill-square":
        return {
          borderRadius: "0px",
        };

      case "fill-rounded":
        return {
          borderRadius: "10px",
        };

      case "fill-outline-shadow":
        return {
          borderRadius: "40px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.88)",
        };

      // Outline Buttons
      case "outline-square":
        return {
          borderRadius: "0px",
          border: "3px solid black",
        };

      case "outline-rounded":
        return {
          borderRadius: "10px",
          border: "3px solid black",
        };

      case "outline-circle":
        return {
          borderRadius: "40px",
          border: "3px solid black",
        };

      // Hard Shadow Buttons
      case "hard-shadow-square":
        return {
            border: "2px solid black",
            boxShadow: "4px 4px 0px black",
        };

      case "hard-shadow-rounded":
        return {
             border: "2px solid black",
             borderRadius: "10px",
             boxShadow: "4px 4px 0px black",
        };

      case "hard-shadow-circle":
        return {
          border: "2px solid black",
          borderRadius: "40px",
          boxShadow: "4px 4px 0px black",
        };

      // Soft Shadow Buttons
      case "soft-shadow-square":
        return {
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.88)",
          borderRadius: "0px",
        };

      case "soft-shadow-rounded":
        return {
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.88)",
          borderRadius: "10px",
        };

      case "soft-shadow-circle":
        return {
          boxShadow: "4px 4px 10px rgba(0, 0, 0, 0.88)",
          borderRadius: "40px",
        };

      // Special Buttons
      case "special-rough":
        return {
          maskImage: "url('/images/rough-mask.svg')",
          WebkitMaskImage: "url('/images/rough-mask.svg')",
          borderRadius:"0px"
        };

      case "special-double-outline":
        return {
          borderRadius:"0px",
          border: "2px solid black",
          position: "relative",
          margin:"1px",
          boxShadow: "0 0 0 5px white, 0 0 0 7px black",
        };

      case "special-black-pill":
        return {
          borderRadius:"40px"
        };

      case "special-right-pill":
        return {
            borderRadius: "50px 0 0 50px",
        };

      default:
        return {
         
        };
    }
  };


  return (
    <div className="mobile-sample">
      <div
        className="mobile-container"
        style={{
          backgroundColor: styles.backgroundColor,
        }}
      >
        <div
          className="mobile-header"
          style={{
            backgroundColor: bgColor,
          }}
        >
          <FaShareAlt className="share-icon" />
          <div className="profile-section">
            <img
              src={avatar || "/images/avatar.svg"}
              alt="Profile"
              className="mobile-avatar"
            />
            <h2>{title}</h2>
          </div>
        </div>

        {/* Toggle tab */}

        <div className="tab-toggle">
          <button
            className={activeTab === "link" ? "active" : ""}
            onClick={() => setActiveTab("link")}
            style={{...getButtonStyle(),  backgroundColor:
            activeTab === "link" ? styles.buttonColor : "#e0e0e0",
          color: activeTab === "link" ? styles.buttonFontColor : "#000",
          fontFamily: activeTab === "shop" ? styles.font : styles.font,
        }}
          >
            Link
          </button>
          <button
            className={activeTab === "shop" ? "active" : ""}
            onClick={() => setActiveTab("shop")}
            style={{...getButtonStyle(),
              backgroundColor:
                activeTab === "shop"
                  ? styles.buttonColor
                  : "#e0e0e0",
              color:
                activeTab === "shop"
                  ? styles.buttonFontColor
                  : "#000",
              fontFamily: activeTab === "shop" ? styles.font : styles.font,
            }}
          >
            Shop
          </button>
        </div>

        {/* Links section */}
        <div className="m-links-section" style={getLayoutStyle()} >
          {(activeTab === "link" ? links : shops).map((item, index) => (
            <div key={index} className="link-item">
              {/* <span className="icon">{}</span> */}
              <p
                style={{
                  color: styles.fontColor || "#000",
                  fontFamily: styles.font || "Poppins",
                }}
                //   onClick={}
              >
                {item.name}
              </p>
            </div>
          ))}
        </div>

        <div
          className="mobile-footer"
          style={{
            backgroundColor: styles.backgroundColor || "#28A263",
          }}
        >
          <button
            className="connect-button"
            style={{...getButtonStyle(),
              backgroundColor: styles.buttonColor || "#28A263",
              color: styles.buttonFontColor || "white",
              fontFamily: styles.font || "Poppins",
            }}
          >
            Get Connected
          </button>
          <div className="mobile-logo" style={{}}>
            SPARK
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSample;
