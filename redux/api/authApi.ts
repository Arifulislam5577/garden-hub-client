import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:5000/api/v1/user`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (endpoint === "resetPass") {
        const token = (getState() as RootState).auth.token;
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: "/sign-in",
        method: "POST",
        body: data,
      }),
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "/sign-up",
        method: "POST",
        body: data,
      }),
    }),
    forgotPass: builder.mutation({
      query: (data) => ({
        url: "/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    resetPass: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useForgotPassMutation,
  useResetPassMutation,
} = authApi;
