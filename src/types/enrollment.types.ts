export interface IEnrollment {
  id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  studentId: string;
  courseId: string;
  progressPercentage: number;
}

export interface ICreateEnrollmentRequest {
  courseId: string;
}

export interface IUpdateEnrollmentStatusRequest {
  enrollmentId: string;
  status: string;
}

export interface IGetEnrollmentsFilters {
  courseId?: string;
  studentId?: string;
  status?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface IEnrollmentListResponse {
  data: IEnrollment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
