"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetCourseByIdQuery } from "@/redux/features/course/course.api";
import { useGetAllLessonsQuery } from "@/redux/features/lesson/lesson.api";
import {
  useGetCourseProgressQuery,
  useUpdateLessonProgressMutation,
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: courseRes, isLoading: isCourseLoading } = useGetCourseByIdQuery(courseId as string);
  const { data: lessonsRes, isLoading: isLessonsLoading } = useGetAllLessonsQuery(courseId as string);
  const { data: progressRes } = useGetCourseProgressQuery(courseId as string);
  const [updateProgress, { isLoading: isUpdatingProgress }] = useUpdateLessonProgressMutation();
  const lessons = useMemo(() => lessonsRes?.data || [], [lessonsRes?.data]);
  const sortedLessons = useMemo(() => [...lessons].sort((a, b) => a.order - b.order), [lessons]);

  // Default to first lesson when loaded
  useEffect(() => {
    if (sortedLessons.length > 0 && !selectedLessonId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedLessonId(sortedLessons[0].id);
    }
  }, [sortedLessons, selectedLessonId]);

  const selectedLesson = lessons.find((l) => l.id === selectedLessonId);
  const completedLessonIds = progressRes?.data?.filter((p) => p.completed).map((p) => p.lessonId) || [];

  const handleMarkAsComplete = async (lessonId: string) => {
    try {
      await updateProgress({
        lessonId,
        completed: true,
      }).unwrap();
      toast.success("Lesson marked as complete!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
      {/* Desktop sidebar */}
      <div className="hidden md:block w-80 border-r bg-muted/20">
        <LessonSidebar
          lessons={lessons}
          selectedLessonId={selectedLessonId}
          onSelectLesson={(id: string) => setSelectedLessonId(id)}
          completedLessonIds={completedLessonIds}
        />
      </div>

      {/* Mobile drawer */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-100 flex md:hidden">
          <div className="w-72 border-r bg-muted/20 shadow-lg">
            <LessonSidebar
              lessons={lessons}
              selectedLessonId={selectedLessonId}
              onSelectLesson={(id: string) => {
                setSelectedLessonId(id);
                setIsSidebarOpen(false);
              }}
              completedLessonIds={completedLessonIds}
            />
          </div>
          <div className="flex-1 " onClick={() => setIsSidebarOpen(false)} />
        </div>
      )}

      <main className="flex-1 overflow-auto">
        {/* Mobile header with toggle */}
        <div className="md:hidden p-3 border-b bg-background/80">
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-primary text-white"
          >
            Lessons
          </button>
        </div>

        {!selectedLesson ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a lesson to start learning
          </div>
        ) : selectedLesson.type === LessonType.video ? (
          <VideoLesson
            lesson={selectedLesson}
            isCompleted={completedLessonIds.includes(selectedLesson.id)}
            onComplete={() => handleMarkAsComplete(selectedLesson.id)}
            isUpdatingProgress={isUpdatingProgress}
          />
        ) : (
          <TextLesson
            lesson={selectedLesson}
            isCompleted={completedLessonIds.includes(selectedLesson.id)}
            onComplete={() => handleMarkAsComplete(selectedLesson.id)}
            isUpdatingProgress={isUpdatingProgress}
          />
        )}
      </main>
    </div>
  );
}
