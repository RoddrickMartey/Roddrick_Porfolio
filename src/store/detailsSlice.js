// src/store/detailsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null, // full user details object
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    setDetails(state, action) {
      state.data = action.payload;
    },
    updateDetails(state, action) {
      // shallow merge for partial updates
      state.data = {
        ...(state.data || {}),
        ...action.payload,
      };
    },
    clearDetails(state) {
      state.data = null;
    },
  },
});

export const { setDetails, updateDetails, clearDetails } = detailsSlice.actions;
export default detailsSlice.reducer;

// selector
export const selectUserDetails = (state) => state.details.data;
