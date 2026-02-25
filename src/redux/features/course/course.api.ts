import { baseApi } from "@/redux/baseApi";
import { TResponse } from "@/types/index";
import { ICourse } from "@/types/course.types";

export type CourseQueryParams = {
  search?: string;
  isFree?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createCourse: builder.mutation<TResponse<ICourse>, any>({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    getAllCourses: builder.query<TResponse<ICourse[]>, CourseQueryParams | void>({
      query: (params) => ({
        url: "/courses",
        method: "GET",
        params,
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

    // get instructor specific courses 

    getCoursesForInstructor: builder.query<TResponse<ICourse[]>, void>({
      query: () => ({
        url: "/courses/instructors",
        method: "GET",
      }),
      providesTags: ["Course"],
    }),


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateCourse: builder.mutation<TResponse<ICourse>, { id: string; body: any }>({
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
    changeCourseStatus: builder.mutation<TResponse<ICourse>, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/courses/${id}/status`,
        method: "PATCH",
        body: { status },
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
  useChangeCourseStatusMutation,
  useGetCoursesForInstructorQuery,
} = courseApi;
