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
  slug?: string;
  description?: string;
  thumbnail?: string;
  price?: number;
  isFree?: boolean;
  status?: "draft" | "published" | "archived";
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
  status?: "draft" | "published" | "archived";
  categoryId?: string;
}

// Frontend/UI specific types for course details
export interface ICourseLesson {
  id: string;
  title: string;
  order: number;
  type: "video" | "text" | string;
}

export interface IInstructor {
  id: string;
  name: string;
}

export interface ICourseDetail {
  slug: string;
  title: string;
  description?: string;
  thumbnail?: string;
  price: number;
  isFree: boolean;
  level?: string;
  students?: string;
  rating?: number;
  instructor: IInstructor;
  category?: { name: string };
  lessons: ICourseLesson[];
}
