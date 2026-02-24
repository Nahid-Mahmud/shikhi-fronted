import { baseApi } from "@/redux/baseApi";
import { TResponse } from "@/types/index";
import { ILesson, ICreateLessonRequest, IUpdateLessonRequest } from "@/types/lesson.types";

export const lessonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLesson: builder.mutation<TResponse<ILesson>, FormData>({
      query: (data) => ({
        url: "/lessons",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Lesson"],
    }),
    getAllLessons: builder.query<TResponse<ILesson[]>, string | void>({
      query: (courseId) => ({
        url: "/lessons",
        method: "GET",
        params: courseId ? { courseId } : {},
      }),
      providesTags: ["Lesson"],
    }),
    getLessonById: builder.query<TResponse<ILesson>, string>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "GET",
      }),
      providesTags: ["Lesson"],
    }),
    updateLesson: builder.mutation<TResponse<ILesson>, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/lessons/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Lesson"],
    }),
    deleteLesson: builder.mutation<TResponse<null>, string>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateLessonMutation,
  useGetAllLessonsQuery,
  useGetLessonByIdQuery,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonApi;
