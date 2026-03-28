import React from "react";

const fonts = [
  "Poppins", "DM Sans", "Arial", "Roboto", "Montserrat", "Lato", "Open Sans", "Inter", "Nunito", 
  "Raleway", "Playfair Display", "Merriweather", "Oswald", "Quicksand", "Fira Sans", "Ubuntu", 
  "Titillium Web", "Work Sans", "Bebas Neue", "Source Sans Pro"
];

const FontSelector = ({ currentFont, onFontSelect, fontColor, onColorChange }) => {
  return (
    <div className="font-customizer">
      <div className="font-selectors">
        <label>Typography</label>
        <select
          value={currentFont}
          onChange={(e) => onFontSelect(e.target.value)}
          className="m-select"
          style={{ fontFamily: currentFont }}
        >
          {fonts.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div className="custom-color-input">
        <label>Font Color</label>
        <div className="picker-wrapper">
          <input
            type="color"
            value={fontColor}
            onChange={(e) => onColorChange(e.target.value)}
          />
          <input
            type="text"
            value={fontColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="m-select"
            placeholder="#000000"
          />
        </div>
      </div>
    </div>
  );
};

export default FontSelector;
