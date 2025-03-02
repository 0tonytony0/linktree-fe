import React from "react";

const layouts = [
  { name: "stack", icon: "stack" },
  { name: "grid", icon: "grid" },
  { name: "carousel", icon: "carousal" },
];

const themes = [
  { name: "Air Snow", color: "#FFFFFF" },
  { name: "Air Gray", color: "#D3D3D3" },
  { name: "Air Smoke", color: "#333333" },
  { name: "Air Black", color: "#000000" },
  { name: "Mineral Blue", color: "#B0E0E6" },
  { name: "Mineral Green", color: "#98FB98" },
  { name: "Mineral Orange", color: "#FFA07A" },
];

const buttonstyles = [{}]

const Appearance = ({ styles, setStyles }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStyles((prev) => ({ ...prev, [name]: value }));
  };

  const handleThemeSelect = (theme) => {
    setStyles((prev) => ({
      ...prev,
      theme: theme.name,
      backgroundColor: theme.color,
    }));
  };

  return (
    <div className="appearance-container">
      {/* Layout Selection */}
      <h2>Layout</h2>
      <div className="section">
        <div className="layout-options">
          {layouts.map((layout) => (
            <button
              key={layout.name}
              className={styles.layout === layout.name ? "active" : ""}
              onClick={() =>
                setStyles((prev) => ({ ...prev, layout: layout.name }))
              }
            >
              <img src={`/images/${layout.icon}.svg`} alt="" className="" style={{border:"1px solid black", margin:"10px"}} />

              <span>{layout.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Button Styles */}
      <h2>Buttons</h2>
      <div className="section">
        <div className="button-container">
          <h3>Fill</h3>
          <div className="row">
            <button
              className="btn fill-square"
              onClick={() =>
                setStyles((prev) => ({ ...prev, buttonStyle: "fill-square" }))
              }
            ></button>
            <button
              className="btn fill-rounded"
              onClick={() =>
                setStyles((prev) => ({ ...prev, buttonStyle: "fill-rounded" }))
              }
            ></button>
            <button
              className="btn fill-outline-shadow"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "fill-outline-shadow",
                }))
              }
            ></button>
          </div>

          <h3>Outline</h3>
          <div className="row">
            <button
              className="btn outline-square"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "outline-square",
                }))
              }
            ></button>
            <button
              className="btn outline-rounded"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "outline-rounded",
                }))
              }
            ></button>
            <button
              className="btn outline-circle"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "outline-circle",
                }))
              }
            ></button>
          </div>

          <h3>Hard Shadow</h3>
          <div className="row">
            <button
              className="btn hard-shadow-square"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "hard-shadow-square",
                }))
              }
            ></button>
            <button
              className="btn hard-shadow-rounded"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "hard-shadow-rounded",
                }))
              }
            ></button>
            <button
              className="btn hard-shadow-circle"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "hard-shadow-circle",
                }))
              }
            ></button>
          </div>

          <h3>Soft Shadow</h3>
          <div className="row">
            <button
              className="btn soft-shadow-square"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "soft-shadow-square",
                }))
              }
            ></button>
            <button
              className="btn soft-shadow-rounded"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "soft-shadow-rounded",
                }))
              }
            ></button>
            <button
              className="btn soft-shadow-circle"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "soft-shadow-circle",
                }))
              }
            ></button>
          </div>

          <h3>Special Buttons</h3>
          <div className="row special-container">
            <button
              className="btn special-rough"
              onClick={() =>
                setStyles((prev) => ({ ...prev, buttonStyle: "special-rough" }))
              }
            ></button>
            {/* <button
              className="btn special-wavy"
              onClick={() =>
                setStyles((prev) => ({ ...prev, buttonStyle: "special-wavy" }))
              }
            ></button> */}
            <button
              className="btn special-double-outline"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "special-double-outline",
                }))
              }
            ></button>
            <button
              className="btn special-black-pill"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "special-black-pill",
                }))
              }
            ></button>
            <button
              className="btn special-right-pill"
              onClick={() =>
                setStyles((prev) => ({
                  ...prev,
                  buttonStyle: "special-right-pill",
                }))
              }
            ></button>
          </div>
        </div>

        <label>Button Color:</label>
        <input
          type="color"
          name="buttonColor"
          value={styles.buttonColor}
          onChange={handleChange}
        />

        <label>Button Font Color:</label>
        <input
          type="color"
          name="buttonFontColor"
          value={styles.buttonFontColor}
          onChange={handleChange}
        />
      </div>

      {/* Font Selection */}
      <h2>Fonts</h2>
      <div className="section">
        <label>Font:</label>
        <select name="font" value={styles.font} onChange={handleChange}>
          <option value="DM Sans">DM Sans</option>
          <option value="Arial">Arial</option>
          <option value="Poppins">Poppins</option>
        </select>

        <label>Font Color:</label>
        <input
          type="color"
          name="fontColor"
          value={styles.fontColor}
          onChange={handleChange}
        />
      </div>

      {/* Theme Selection */}
      <h2>Themes</h2>
      <div className="section">
        <div className="theme-options">
          {themes.map((theme) => (
            <button
              key={theme.name}
              className={styles.theme === theme.name ? "active" : ""}
              style={{ backgroundColor: theme.color }}
              onClick={() => handleThemeSelect(theme)}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <button className="save-button">Save</button>
    </div>
  );
};

export default Appearance;
