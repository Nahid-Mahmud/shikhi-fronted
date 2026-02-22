import { baseApi } from "@/redux/baseApi";
import { TResponse } from "@/types/index";
import {
  ILessonProgress,
  ICreateLessonProgressRequest,
  IUpdateLessonProgressRequest,
} from "@/types/lessonProgress.types";

export const lessonProgressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createLessonProgress: builder.mutation<TResponse<ILessonProgress>, ICreateLessonProgressRequest>({
      query: (data) => ({
        url: "/lesson-progress",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["LessonProgress"],
    }),
    getAllLessonProgress: builder.query<TResponse<ILessonProgress[]>, void>({
      query: () => ({
        url: "/lesson-progress",
        method: "GET",
      }),
      providesTags: ["LessonProgress"],
    }),
    getLessonProgressById: builder.query<TResponse<ILessonProgress>, string>({
      query: (id) => ({
        url: `/lesson-progress/${id}`,
        method: "GET",
      }),
      providesTags: ["LessonProgress"],
    }),
    updateLessonProgress: builder.mutation<
      TResponse<ILessonProgress>,
      { id: string; body: IUpdateLessonProgressRequest }
    >({
      query: ({ id, body }) => ({
        url: `/lesson-progress/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["LessonProgress"],
    }),
    deleteLessonProgress: builder.mutation<TResponse<null>, string>({
      query: (id) => ({
        url: `/lesson-progress/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LessonProgress"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateLessonProgressMutation,
  useGetAllLessonProgressQuery,
  useGetLessonProgressByIdQuery,
  useUpdateLessonProgressMutation,
  useDeleteLessonProgressMutation,
} = lessonProgressApi;
