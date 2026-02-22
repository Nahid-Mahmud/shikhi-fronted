import { baseApi } from "@/redux/baseApi";
import { tagTypes } from "@/redux/tagTypes";
import {
  TForgetPasswordResponse,
  TLoginRequest,
  TLoginResponse,
  TRegisterRequest,
  TResetPasswordResponse,
  TUser,
} from "@/types/auth";
import { TResponse } from "@/types/index";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<TResponse<TUser>, TRegisterRequest>({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),

    getMe: builder.query<TResponse<TUser>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    login: builder.mutation<TResponse<TLoginResponse>, TLoginRequest>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: tagTypes,
    }),

    forgetPassword: builder.mutation<TResponse<TForgetPasswordResponse>, { email: string }>({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<TResponse<TResetPasswordResponse>, { token: string; newPassword: string }>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation<TResponse<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Reset entire API state to clear all cached data
          dispatch(baseApi.util.resetApiState());
        } catch (error) {
          // Even if logout fails, clear all cache
          dispatch(baseApi.util.resetApiState());
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useLogoutMutation,
  useResetPasswordMutation,
  useGetMeQuery,
} = authApi;
