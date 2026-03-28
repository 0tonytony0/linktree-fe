import React from "react";

const ButtonStyler = ({ 
  buttonStyle, 
  onStyleChange, 
  buttonColor, 
  onColorChange, 
  buttonFontColor, 
  onFontColorChange 
}) => {
  const categories = [
    { title: "Fill", styles: ["fill-square", "fill-rounded", "fill-outline-shadow"] },
    { title: "Outline", styles: ["outline-square", "outline-rounded", "outline-circle"] },
    { title: "Hard Shadow", styles: ["hard-shadow-square", "hard-shadow-rounded", "hard-shadow-circle"] },
    { title: "Soft Shadow", styles: ["soft-shadow-square", "soft-shadow-rounded", "soft-shadow-circle"] },
    { title: "Special", styles: ["special-glass", "special-neon", "special-3d", "special-wavy", "special-mesh", "special-sketch"] }
  ];

  return (
    <div className="button-customizer">
      <div className="button-grid">
        {categories.map((cat) => (
          <div key={cat.title} className="button-category">
            <span className="btn-label">{cat.title}</span>
            <div className="row">
              {cat.styles.map((style) => (
                <button
                  key={style}
                  type="button"
                  className={`btn-preview ${style} ${buttonStyle === style ? "active-style" : ""}`}
                  onClick={() => onStyleChange(style)}
                  title={style.replace(/-/g, ' ')}
                  style={{
                    backgroundColor: style.includes("fill") || style.includes("special-black") ? buttonColor : "transparent",
                    color: style.includes("fill") || style.includes("special-black") ? buttonFontColor : buttonColor,
                    borderColor: buttonColor,
                    fontFamily: "var(--font-main)"
                  }}
                ></button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="color-selectors">
        <div className="custom-color-input">
          <label>Button Color</label>
          <div className="picker-wrapper">
            <input 
              type="color" 
              value={buttonColor} 
              onChange={(e) => onColorChange(e.target.value)} 
            />
            <input 
              type="text" 
              value={buttonColor} 
              onChange={(e) => onColorChange(e.target.value)}
              className="m-select"
            />
          </div>
        </div>

        <div className="custom-color-input">
          <label>Button Font Color</label>
          <div className="picker-wrapper">
            <input 
              type="color" 
              value={buttonFontColor} 
              onChange={(e) => onFontColorChange(e.target.value)} 
            />
            <input 
              type="text" 
              value={buttonFontColor} 
              onChange={(e) => onFontColorChange(e.target.value)}
              className="m-select"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonStyler;
