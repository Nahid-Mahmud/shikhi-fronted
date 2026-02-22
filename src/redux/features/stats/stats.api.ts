import { baseApi } from "@/redux/baseApi";
import { TResponse } from "@/types/index";
import {
  IOverallStats,
  IEnrollmentGrowthItem,
  ITopCourseItem,
  IRevenuePerCourseItem,
  IInstructorCompletionRateItem,
  ICoursesByCategoryItem,
  IGlobalCompletionRate,
} from "@/types/stats.types";

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOverallStats: builder.query<TResponse<IOverallStats>, void>({
      query: () => ({ url: "/stats/overall", method: "GET" }),
      providesTags: ["Stats"],
    }),
    getEnrollmentGrowth: builder.query<TResponse<IEnrollmentGrowthItem[]>, void>({
      query: () => ({ url: "/stats/enrollment-growth", method: "GET" }),
      providesTags: ["Stats"],
    }),
    getTopCourses: builder.query<TResponse<ITopCourseItem[]>, void>({
      query: () => ({ url: "/stats/top-courses", method: "GET" }),
      providesTags: ["Stats"],
    }),
    getRevenuePerCourse: builder.query<TResponse<IRevenuePerCourseItem[]>, void>({
      query: () => ({ url: "/stats/revenue-per-course", method: "GET" }),
      providesTags: ["Stats"],
    }),
    getInstructorCompletionRates: builder.query<TResponse<IInstructorCompletionRateItem[]>, void>({
      query: () => ({
        url: "/stats/instructor-completion-rates",
        method: "GET",
      }),
      providesTags: ["Stats"],
    }),
    getCoursesByCategory: builder.query<TResponse<ICoursesByCategoryItem[]>, void>({
      query: () => ({ url: "/stats/courses-by-category", method: "GET" }),
      providesTags: ["Stats"],
    }),
    getGlobalCompletionRate: builder.query<TResponse<IGlobalCompletionRate>, void>({
      query: () => ({ url: "/stats/global-completion-rate", method: "GET" }),
      providesTags: ["Stats"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOverallStatsQuery,
  useGetEnrollmentGrowthQuery,
  useGetTopCoursesQuery,
  useGetRevenuePerCourseQuery,
  useGetInstructorCompletionRatesQuery,
  useGetCoursesByCategoryQuery,
  useGetGlobalCompletionRateQuery,
} = statsApi;
