import { apiSlice } from "../apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({
        sort = "",
        page = 1,
        limit = 1,
        userId = "",
        category = "",
        slug = "",
        postId = "",
        search = "",
      }) =>
        `/api/post/getposts?sort=${sort}&page=${page}&limit=${limit}&userId=${userId}&category=${category}&slug=${slug}&postId=${postId}&querySearch=${search}`,
      providesTags: ["Post"],
    }),

    createPost: builder.mutation({
      query: (data) => ({
        url: "/api/post/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useLazyGetPostsQuery, useCreatePostMutation } =
  postApi;
