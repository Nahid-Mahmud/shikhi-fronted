import { baseApi } from "@/redux/baseApi";
import { TResponse } from "@/types/index";
import {
  IEnrollment,
  ICreateEnrollmentRequest,
  IUpdateEnrollmentStatusRequest,
  IGetEnrollmentsFilters,
  IEnrollmentListResponse,
} from "@/types/enrollment.types";

export const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    enrollStudent: builder.mutation<TResponse<IEnrollment>, ICreateEnrollmentRequest>({
      query: (data) => ({
        url: "/enrollment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Enrollment"],
    }),
    updateEnrollmentStatus: builder.mutation<TResponse<IEnrollment>, IUpdateEnrollmentStatusRequest>({
      query: (data) => ({
        url: `/enrollment/${data.enrollmentId}/status`,
        method: "PATCH",
        body: { status: data.status },
      }),
      invalidatesTags: ["Enrollment"],
    }),
    getMyEnrolledCourses: builder.query<TResponse<IEnrollment[]>, string>({
      query: (studentId) => ({
        url: `/enrollment/my-courses?studentId=${studentId}`,
        method: "GET",
      }),
      providesTags: ["Enrollment"],
    }),
    getCourseEnrollments: builder.query<TResponse<IEnrollmentListResponse>, IGetEnrollmentsFilters>({
      query: (filters) => ({
        url: "/enrollment/course-enrollments",
        method: "GET",
        params: filters,
      }),
      providesTags: ["Enrollment"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useEnrollStudentMutation,
  useUpdateEnrollmentStatusMutation,
  useGetMyEnrolledCoursesQuery,
  useGetCourseEnrollmentsQuery,
} = enrollmentApi;
