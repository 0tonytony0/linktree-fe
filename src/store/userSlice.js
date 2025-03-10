import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  f_name: "",
  l_name: "",
  bio: "",
  username: "",
  email: "",
  avatar: "",
  isAuthenticated: false,
  profileId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log({ action });
      state.f_name = action.payload.f_name;
      state.l_name = action.payload.l_name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.label = action.payload.label;
      state.bio = action.payload.bio;
      state.profileId = action.payload.profileId;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.username = "";
      state.email = "";
      state.avatar = "";
      state.isAuthenticated = false;
      state.profileId = "";
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
