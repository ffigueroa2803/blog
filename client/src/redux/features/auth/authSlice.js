import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadProgress: 0,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    signUpSuccess: (state, action) => {
      return {
        ...state,
        currentUser: {
          ...state?.currentUser,
          user: {
            ...state?.currentUser?.user,
            name: action.payload.name,
            email: action.payload.email,
            image: action.payload.image,
          },
        },
      };
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
    },
    setUploadProgress: (state, action) => {
      return {
        ...state,
        uploadProgress: action.payload,
      };
    },
  },
});

export const {
  signInSuccess,
  signUpSuccess,
  signoutSuccess,
  setUploadProgress,
} = authSlice.actions;
export default authSlice.reducer;
