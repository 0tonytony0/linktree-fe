import React from "react";

const fonts = [
  "Poppins", "DM Sans", "Arial", "Roboto", "Montserrat", "Lato", "Open Sans", "Inter", "Nunito", 
  "Raleway", "Playfair Display", "Merriweather", "Oswald", "Quicksand", "Fira Sans", "Ubuntu", 
  "Titillium Web", "Work Sans", "Bebas Neue", "Source Sans Pro"
];

const FontSelector = ({ currentFont, onFontSelect, fontColor, onColorChange }) => {
  return (
    <div className="section">
      <div className="font-selectors">
        <label>Font:</label>
        <select
          value={currentFont}
          onChange={(e) => onFontSelect(e.target.value)}
          className="m-select"
        >
          {fonts.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>

        <label className="ml-4">Font Color:</label>
        <div className="custom-color-input">
          <input
            type="color"
            value={fontColor}
            onChange={(e) => onColorChange(e.target.value)}
          />
          <input
            type="text"
            value={fontColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="text-input"
          />
        </div>
      </div>
    </div>
  );
};

export default FontSelector;
