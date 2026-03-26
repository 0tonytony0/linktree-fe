import React from "react";

const layouts = [
  { name: "stack", icon: "stack" },
  { name: "grid", icon: "grid" },
  { name: "carousel", icon: "carousal" },
];

const LayoutPicker = ({ currentLayout, onSelect }) => {
  return (
    <div className="section">
      <div className="layout-options">
        {layouts.map((layout) => (
          <button
            key={layout.name}
            className={currentLayout === layout.name ? "active" : ""}
            onClick={() => onSelect(layout.name)}
          >
            <img
              src={`/images/${layout.icon}.svg`}
              alt={layout.name}
              style={{ border: "1px solid #eee", margin: "10px", borderRadius: "8px" }}
            />
            <span>{layout.name.charAt(0).toUpperCase() + layout.name.slice(1)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayoutPicker;
