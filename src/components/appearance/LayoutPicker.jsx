import React from "react";

const layouts = [
  { name: "stack", icon: "stack" },
  { name: "grid", icon: "grid" },
];

const LayoutPicker = ({ currentLayout, onSelect }) => {
  return (
    <div className="layout-options">
      {layouts.map((layout) => (
        <button
          key={layout.name}
          className={currentLayout === layout.name ? "active" : ""}
          onClick={() => onSelect(layout.name)}
          type="button"
        >
          <div className="layout-preview-img">
            <img
              src={`/images/${layout.icon}.svg`}
              alt={layout.name}
            />
          </div>
          <span>{layout.name.charAt(0).toUpperCase() + layout.name.slice(1)}</span>
        </button>
      ))}
    </div>
  );
};

export default LayoutPicker;
