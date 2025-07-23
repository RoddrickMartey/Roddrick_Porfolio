import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // { id, username }
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload; // { id, username }
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    hydrateUser: (state, action) => {
      // if persisted user is restored
      state.user = action.payload || null;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, hydrateUser } = authSlice.actions;
export default authSlice.reducer;
