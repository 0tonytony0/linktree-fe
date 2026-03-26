import React from "react";

const ButtonStyler = ({ buttonStyle, onStyleChange, buttonColor, onColorChange, buttonFontColor, onFontColorChange }) => {
  const categories = [
    { title: "Fill", styles: ["fill-square", "fill-rounded", "fill-outline-shadow"] },
    { title: "Outline", styles: ["outline-square", "outline-rounded", "outline-circle"] },
    { title: "Hard Shadow", styles: ["hard-shadow-square", "hard-shadow-rounded", "hard-shadow-circle"] },
    { title: "Soft Shadow", styles: ["soft-shadow-square", "soft-shadow-rounded", "soft-shadow-circle"] },
    { title: "Special Buttons", styles: ["special-rough", "special-double-outline", "special-black-pill", "special-right-pill"] }
  ];

  return (
    <div className="section">
      <div className="button-container">
        {categories.map((cat) => (
          <React.Fragment key={cat.title}>
            <h3>{cat.title}</h3>
            <div className="row">
              {cat.styles.map((style) => (
                <button
                  key={style}
                  className={`btn ${style} ${buttonStyle === style ? "active-style" : ""}`}
                  onClick={() => onStyleChange(style)}
                ></button>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="color-pickers mt-4">
        <label>Button Color:</label>
        <input type="color" value={buttonColor} onChange={(e) => onColorChange(e.target.value)} />

        <label className="ml-4">Button Font Color:</label>
        <input type="color" value={buttonFontColor} onChange={(e) => onFontColorChange(e.target.value)} />
      </div>
    </div>
  );
};

export default ButtonStyler;
