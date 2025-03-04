import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
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
