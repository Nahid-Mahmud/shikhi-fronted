import { baseApi } from "@/redux/baseApi";
import { TResponse } from "@/types/index";

export interface ICheckoutSessionResponse {
  url?: string;
  message: string;
  enrolled?: boolean;
  enrollment?: unknown;
}

export interface IConfirmPaymentResponse {
  success?: boolean;
  message?: string;
}

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<
      TResponse<ICheckoutSessionResponse>,
      { courseId: string }
    >({
      query: (data) => ({
        url: "/payments/create-checkout-session",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment", "Enrollment"],
    }),
    confirmPayment: builder.mutation<
      TResponse<IConfirmPaymentResponse>,
      { sessionId: string }
    >({
      query: (data) => ({
        url: "/payments/confirm-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment", "Enrollment"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateCheckoutSessionMutation, useConfirmPaymentMutation } =
  paymentApi;
