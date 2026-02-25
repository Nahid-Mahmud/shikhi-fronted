"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetCourseByIdQuery } from "@/redux/features/course/course.api";
import { useGetAllLessonsQuery } from "@/redux/features/lesson/lesson.api";
import {
  useGetAllLessonProgressQuery,
  useCreateLessonProgressMutation,
} from "@/redux/features/lessonProgress/lessonProgress.api";
import { LessonSidebar } from "@/components/enrolled-course/LessonSidebar";
import { VideoLesson } from "@/components/enrolled-course/VideoLesson";
import { TextLesson } from "@/components/enrolled-course/TextLesson";
import { LessonType } from "@/types/lesson.types";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function EnrolledCourseDetail() {
  const { id: courseId } = useParams();
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  const { data: courseRes, isLoading: isCourseLoading } = useGetCourseByIdQuery(courseId as string);
  const { data: lessonsRes, isLoading: isLessonsLoading } = useGetAllLessonsQuery(courseId as string);
  const { data: progressRes } = useGetAllLessonProgressQuery();
  const [createProgress] = useCreateLessonProgressMutation();

  const lessons = lessonsRes?.data || [];
  const sortedLessons = useMemo(() => [...lessons].sort((a, b) => a.order - b.order), [lessons]);

  // Default to first lesson when loaded
  useEffect(() => {
    if (sortedLessons.length > 0 && !selectedLessonId) {
      setSelectedLessonId(sortedLessons[0].id);
    }
  }, [sortedLessons, selectedLessonId]);

  const selectedLesson = lessons.find((l) => l.id === selectedLessonId);
  const completedLessonIds = progressRes?.data?.filter((p) => p.completed).map((p) => p.lessonId) || [];

  const handleMarkAsComplete = async (lessonId: string) => {
    try {
      await createProgress({
        lessonId,
        completed: true,
        // userId: loggedInUser?.id // The backend probably gets userId from auth token
      } as any).unwrap();
      toast.success("Lesson marked as complete!");
    } catch (error) {
      toast.error("Failed to update progress");
    }
  };

  if (isCourseLoading || isLessonsLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] animate-pulse">
        <div className="w-80 border-r bg-muted/20" />
        <div className="flex-1 p-8">
          <Skeleton className="h-[60%] w-full rounded-xl mb-4" />
          <Skeleton className="h-8 w-1/3 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-64px)] bg-background">
      <LessonSidebar
        lessons={lessons}
        selectedLessonId={selectedLessonId}
        onSelectLesson={setSelectedLessonId}
        completedLessonIds={completedLessonIds}
      />
      <main className="flex-1 overflow-hidden">
        {!selectedLesson ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a lesson to start learning
          </div>
        ) : selectedLesson.type === LessonType.video ? (
          <VideoLesson
            lesson={selectedLesson}
            isCompleted={completedLessonIds.includes(selectedLesson.id)}
            onComplete={() => handleMarkAsComplete(selectedLesson.id)}
          />
        ) : (
          <TextLesson
            lesson={selectedLesson}
            isCompleted={completedLessonIds.includes(selectedLesson.id)}
            onComplete={() => handleMarkAsComplete(selectedLesson.id)}
          />
        )}
      </main>
    </div>
  );
}
