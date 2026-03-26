import React from "react";

const themes = [
  { name: "Air Snow", color: "#FFFFFF", icon: "/images/1.svg" },
  { name: "Air Smoke", color: "#333333", icon: "/images/2.svg" },
  { name: "Air Black", color: "#000000", icon: "/images/3.svg" },
  { name: "Mineral Blue", color: "#B0E0E6", icon: "/images/4.svg" },
  { name: "Mineral Green", color: "#98FB98", icon: "/images/5.svg" },
  { name: "Mineral Orange", color: "#FFA07A", icon: "/images/6.svg" },
  { name: "Air Gray", color: "#D3D3D3", icon: "/images/7.svg" },
];

const ThemeGrid = ({ currentTheme, onSelect }) => {
  return (
    <div className="section">
      <div className="theme-options">
        {themes.map((theme) => (
          <button
            key={theme.name}
            className={currentTheme === theme.name ? "active-theme" : ""}
            onClick={() => onSelect(theme)}
          >
            <img
              src={theme.icon}
              alt={theme.name}
              style={{ border: "1px solid #eee", margin: "10px", borderRadius: "8px" }}
            />
            <span>{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeGrid;
