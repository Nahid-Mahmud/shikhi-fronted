export enum LessonType {
  video = "video",
  text = "text",
}

export interface ILesson {
  id: string;
  title: string;
  content?: string;
  type: LessonType;
  videoUrl?: string;
  description?: string;
  order: number;
  isPreview: boolean;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateLessonRequest {
  title: string;
  content?: string;
  type: LessonType;
  video?: File;
  description?: string;
  order: number;
  isPreview: boolean;
  courseId: string;
}

export interface IUpdateLessonRequest {
  title?: string;
  content?: string;
  type?: LessonType;
  video?: File;
  description?: string;
  order?: number;
  isPreview?: boolean;
}
