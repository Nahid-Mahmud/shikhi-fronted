import { baseApi } from "@/redux/baseApi";
import { TResponse } from "@/types/index";
import { IPayment, ICreatePaymentRequest, IUpdatePaymentRequest } from "@/types/payment.types";

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation<TResponse<IPayment>, ICreatePaymentRequest>({
      query: (data) => ({
        url: "/payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),
    getAllPayments: builder.query<TResponse<IPayment[]>, void>({
      query: () => ({
        url: "/payment",
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
    getPaymentById: builder.query<TResponse<IPayment>, string>({
      query: (id) => ({
        url: `/payment/${id}`,
        method: "GET",
      }),
      providesTags: ["Payment"],
    }),
    updatePayment: builder.mutation<TResponse<IPayment>, { id: string; body: IUpdatePaymentRequest }>({
      query: ({ id, body }) => ({
        url: `/payment/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Payment"],
    }),
    deletePayment: builder.mutation<TResponse<null>, string>({
      query: (id) => ({
        url: `/payment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
