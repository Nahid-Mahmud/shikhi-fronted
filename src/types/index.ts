export type TResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
};

export type TError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources?: {
      path: string | number;
      message: string;
    }[];
    stack?: string;
  };
};
