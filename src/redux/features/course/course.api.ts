import { baseApi } from "@/redux/baseApi";
import { TResponse } from "@/types/index";
import { ICourse, ICreateCourseRequest, IUpdateCourseRequest } from "@/types/course.types";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation<TResponse<ICourse>, ICreateCourseRequest>({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    getAllCourses: builder.query<TResponse<ICourse[]>, void>({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    getCourseById: builder.query<TResponse<ICourse>, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "GET",
      }),
      providesTags: ["Course"],
    }),
    updateCourse: builder.mutation<TResponse<ICourse>, { id: string; body: IUpdateCourseRequest }>({
      query: ({ id, body }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation<TResponse<null>, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseByIdQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
