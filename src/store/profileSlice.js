import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isProfileData: false,
  title: "",
  bio: "",
  links: [],
  shops: [],
  bgColor: "#3B312C",
  customColor: "#000000",
  avatar: null,
  styles: {
    layout: "stack",
    buttonStyle: "",
    buttonColor: "#28A263",
    buttonFontColor: "#ffffff",
    font: "Poppins",
    fontColor: "#000000",
    theme: "air-snow",
    backgroundColor: "#ffffff",
  },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      const data = action.payload;
      state.isProfileData = true;
      state.title = data.title || "";
      state.bio = data.bio || "";
      state.links = data.links || [];
      state.shops = data.shops || [];
      state.bgColor = data.banner || "#3B312C";
      state.customColor = data.banner || "#000000";
      state.avatar = data.avatar || null;
      if (data.appreance) {
        state.styles = data.appreance;
      }
    },
    updateProfileField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    updateTitle: (state, action) => {
      state.title = action.payload;
      state.isProfileData = true;
    },
    updateBio: (state, action) => {
      state.bio = action.payload;
      state.isProfileData = true;
    },
    updateLinks: (state, action) => {
      state.links = action.payload;
      state.isProfileData = true;
    },
    updateShops: (state, action) => {
      state.shops = action.payload;
      state.isProfileData = true;
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
      state.isProfileData = true;
    },
    updateBanner: (state, action) => {
      state.bgColor = action.payload;
      state.customColor = action.payload;
      state.isProfileData = true;
    },
    updateStylesField: (state, action) => {
      const { field, value } = action.payload;
      state.styles[field] = value;
      state.isProfileData = true;
    },
    incrementLinkClick: (state, action) => {
      const { linkId, isLink } = action.payload;
      const targetArray = isLink ? state.links : state.shops;
      const index = targetArray.findIndex((item) => item._id === linkId);
      if (index !== -1) {
        targetArray[index].clicks += 1;
      }
    },
    clearProfile: () => initialState,
  },
});

export const {
  setProfileData,
  updateProfileField,
  updateTitle,
  updateBio,
  updateLinks,
  updateShops,
  updateAvatar,
  updateBanner,
  updateStylesField,
  incrementLinkClick,
  clearProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
