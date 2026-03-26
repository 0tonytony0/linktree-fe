import React from "react";
import LayoutPicker from "./appearance/LayoutPicker";
import ButtonStyler from "./appearance/ButtonStyler";
import FontSelector from "./appearance/FontSelector";
import ThemeGrid from "./appearance/ThemeGrid";

const Appearance = ({ styles, setStyles, saveHandler }) => {
  const updateStyle = (name, value) => {
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
      <h2>Layout</h2>
      <LayoutPicker
        currentLayout={styles.layout}
        onSelect={(val) => updateStyle("layout", val)}
      />

      <h2>Buttons</h2>
      <ButtonStyler
        buttonStyle={styles.buttonStyle}
        onStyleChange={(val) => updateStyle("buttonStyle", val)}
        buttonColor={styles.buttonColor}
        onColorChange={(val) => updateStyle("buttonColor", val)}
        buttonFontColor={styles.buttonFontColor}
        onFontColorChange={(val) => updateStyle("buttonFontColor", val)}
      />

      <h2>Fonts</h2>
      <FontSelector
        currentFont={styles.font}
        onFontSelect={(val) => updateStyle("font", val)}
        fontColor={styles.fontColor}
        onColorChange={(val) => updateStyle("fontColor", val)}
      />

      <h2>Themes</h2>
      <ThemeGrid
        currentTheme={styles.theme}
        onSelect={handleThemeSelect}
      />

      <button className="save-button" onClick={saveHandler}>
        Save
      </button>
    </div>
  );
};

export default Appearance;
