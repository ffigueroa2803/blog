import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: undefined,
  page: 1,
  limit: 8,
  search: "",
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    postChangeCurrentPage: (state, action) => {
      state.page = action.payload;
    },
    postSearch: (state, action) => {
      state.search = action.payload;
    },
    postClearInit: (state) => {
      state.page = 1;
      state.limit = 2;
      state.search = "";
    },
  },
});

export const { postChangeCurrentPage, postSearch, postClearInit } =
  postSlice.actions;
export default postSlice.reducer;
