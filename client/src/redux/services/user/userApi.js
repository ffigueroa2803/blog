import { apiSlice } from "../apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page, limit, search }) =>
        `/api/user/getusers?page=${page}&limit=${limit}&querySearch=${search}`,
      providesTags: ["User"],
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "User", page, limit },
      ],
    }),
  }),
});

export const { useGetUsersQuery, useCreateUserMutation } = userApi;
