import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const { signInSuccess, signoutSuccess } = authSlice.actions;
export default authSlice.reducer;
