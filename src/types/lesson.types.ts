export interface ILesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateLessonRequest {
  title: string;
  description: string;
  videoUrl: string;
  courseId: string;
}

export interface IUpdateLessonRequest {
  title?: string;
  description?: string;
  videoUrl?: string;
}
