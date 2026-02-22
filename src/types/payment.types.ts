export interface IPayment {
  id: string;
  amount: number;
  currency: string;
  status: "pending" | "succeeded" | "failed" | "refunded" | string;
  transactionId?: string | null;
  userId?: string | null;
  courseId?: string | null;
  metadata?: Record<string, unknown> | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreatePaymentRequest {
  amount: number;
  currency?: string;
  courseId?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}

export interface IUpdatePaymentRequest {
  status?: IPayment["status"];
  transactionId?: string | null;
  metadata?: Record<string, unknown> | null;
}
