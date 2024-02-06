import { apiSlice } from "../apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/signin",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "User", page, limit },
      ],
    }),
  }),
});

export const { useLoginMutation } = authApi;
