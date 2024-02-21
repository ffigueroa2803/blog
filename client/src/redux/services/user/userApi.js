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
        url: "/api/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `/api/user/update/${data?.id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
} = userApi;
