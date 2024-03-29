import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signoutSuccess } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API,
  credentials: "include",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.currentUser?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 401 || result?.error?.status === 403) {
      api.dispatch(signoutSuccess());
      localStorage.clear();
    }
    return result;
  },
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
