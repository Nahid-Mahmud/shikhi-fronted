import { baseApi } from "@/redux/baseApi";
import { TResponse } from "@/types";
import { ILessonProgress } from "@/types/lessonProgress.types";

export const lessonProgressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateLessonProgress: builder.mutation<TResponse<ILessonProgress>, { lessonId: string; completed: boolean }>({
      query: (data) => ({
        url: "/lesson-progress",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lesson", "Course"],
    }),
    getMyProgress: builder.query<TResponse<ILessonProgress[]>, void>({
      query: () => ({
        url: "/lesson-progress",
        method: "GET",
      }),
      providesTags: ["Lesson"],
    }),
    getCourseProgress: builder.query<TResponse<ILessonProgress[]>, string>({
      query: (courseId) => ({
        url: `/lesson-progress/${courseId}`,
        method: "GET",
      }),
      providesTags: ["Lesson"],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateLessonProgressMutation, useGetMyProgressQuery, useGetCourseProgressQuery } = lessonProgressApi;
