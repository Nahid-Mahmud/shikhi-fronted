export interface ICourse {
  id: string;
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  price: number;
  isFree: boolean;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  instructorId: string;
  categoryId?: string;
}

export interface ICreateCourseRequest {
  title: string;
  slug: string;
  description?: string;
  thumbnail?: string;
  price?: number;
  isFree?: boolean;
  status?: string;
  instructorId: string;
  categoryId?: string;
}

export interface IUpdateCourseRequest {
  title?: string;
  slug?: string;
  description?: string;
  thumbnail?: string;
  price?: number;
  isFree?: boolean;
  status?: string;
  categoryId?: string;
}
