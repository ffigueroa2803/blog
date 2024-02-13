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

    google: builder.mutation({
      query: (data) => ({
        url: "/api/auth/google",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { page, limit }) => [
        { type: "User", page, limit },
      ],
    }),

    close: builder.mutation({
      query: () => ({
        url: "/api/auth/signout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useGoogleMutation, useCloseMutation } =
  authApi;
