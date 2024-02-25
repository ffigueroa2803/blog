import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: undefined,
  page: 1,
  limit: 8,
  search: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    userSearch: (state, action) => {
      state.search = action.payload;
    },
    userClearInit: (state) => {
      state.page = 1;
      state.limit = 2;
      state.search = "";
    },
  },
});

export const { userChangeCurrentPage, userSearch, userClearInit } =
  userSlice.actions;
export default userSlice.reducer;
