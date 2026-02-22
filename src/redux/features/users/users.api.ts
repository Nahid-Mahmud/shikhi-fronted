import { baseApi } from "@/redux/baseApi";
import { TResponse } from "@/types";
import { TUser } from "@/types/auth";
import {
  IGetAllUsersResponse,
  IUpdateAdminRequest,
  IUpdateUserRequest,
  IUpdateUserRoleRequest,
  IUpdateUserStatusRequest,
  IUser,
} from "@/types/user.types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<TResponse<TUser>, void>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getAllUsers: builder.query<TResponse<IGetAllUsersResponse>, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query<TResponse<IUser>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    updateUserStatus: builder.mutation<TResponse<IUser>, IUpdateUserStatusRequest>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}/status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation<TResponse<null>, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<TResponse<IUser>, IUpdateUserRequest>({
      query: ({ id, ...body }) => ({
        url: `/users/self/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateAdmin: builder.mutation<TResponse<IUser>, IUpdateAdminRequest>({
      query: ({ id, ...body }) => ({
        url: `/users/admin/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation<TResponse<IUser>, IUpdateUserRoleRequest>({
      query: ({ id, ...body }) => ({
        url: `/users/${id}/role`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUpdateAdminMutation,
  useUpdateUserRoleMutation,
} = userApi;
