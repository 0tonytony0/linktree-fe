import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStylesField } from "../store/profileSlice";
import LayoutPicker from "./appearance/LayoutPicker";
import ButtonStyler from "./appearance/ButtonStyler";
import FontSelector from "./appearance/FontSelector";
import ThemeGrid from "./appearance/ThemeGrid";

const Appearance = ({ saveHandler }) => {
  const dispatch = useDispatch();
  const styles = useSelector((state) => state.profile.styles);

  const updateStyle = (name, value) => {
    dispatch(updateStylesField({ field: name, value }));
  };

  const handleThemeSelect = (theme) => {
    // Dispatch both theme and its default background color
    dispatch(updateStylesField({ field: "theme", value: theme.name }));
    dispatch(updateStylesField({ field: "backgroundColor", value: theme.color }));
  };

  return (
    <div className="appearance-container">
      <div className="section">
        <h3>Layout</h3>
        <LayoutPicker
          currentLayout={styles.layout}
          onSelect={(val) => updateStyle("layout", val)}
        />
      </div>

      <div className="section">
        <h3>Buttons</h3>
        <ButtonStyler
          buttonStyle={styles.buttonStyle}
          onStyleChange={(val) => updateStyle("buttonStyle", val)}
          buttonColor={styles.buttonColor}
          onColorChange={(val) => updateStyle("buttonColor", val)}
          buttonFontColor={styles.buttonFontColor}
          onFontColorChange={(val) => updateStyle("buttonFontColor", val)}
        />
      </div>

      <div className="section">
        <h3>Fonts</h3>
        <FontSelector
          currentFont={styles.font}
          onFontSelect={(val) => updateStyle("font", val)}
          fontColor={styles.fontColor}
          onColorChange={(val) => updateStyle("fontColor", val)}
        />
      </div>

      <div className="section">
        <h3>Themes</h3>
        <ThemeGrid
          currentTheme={styles.theme}
          onSelect={handleThemeSelect}
        />
      </div>

      <div className="save-container">
        <button className="save-button" onClick={saveHandler}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Appearance;
