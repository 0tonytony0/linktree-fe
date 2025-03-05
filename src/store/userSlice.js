import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  f_name: "",
  l_name: "",
  bio: "",
  username: "",
  email: "",
  avatar: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.f_name = action.payload.f_name;
      state.l_name = action.payload.l_name;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.label = action.payload.label;
      state.bio = action.payload.bio;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.username = "";
      state.email = "";
      state.avatar = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
