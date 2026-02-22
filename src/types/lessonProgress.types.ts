export interface ILessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateLessonProgressRequest {
  userId: string;
  lessonId: string;
  completed: boolean;
  completedAt?: string;
}

export interface IUpdateLessonProgressRequest {
  completed?: boolean;
  completedAt?: string;
}
