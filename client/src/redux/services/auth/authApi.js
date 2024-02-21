import { setUploadProgress } from "../../features/auth/authSlice";
import { apiSlice } from "../apiSlice";
import axios from "axios";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/auth/signin",
        method: "POST",
        body: data,
      }),
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

    uploadProgress: builder.mutation({
      queryFn: async ({ url, data }, api) => {
        try {
          console.log({ url, data });
          const result = await axios.post(url, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (upload) => {
              //Establezca el valor de progreso para mostrar la barra de progreso
              let uploadloadProgress = Math.round(
                (100 * upload.loaded) / upload.total
              );
              api.dispatch(setUploadProgress(uploadloadProgress));
            },
          });

          return { data: result.data };
        } catch (axiosError) {
          let err = axiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message,
            },
          };
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGoogleMutation,
  useCloseMutation,
  useUploadProgressMutation,
} = authApi;
