"use client";

import { ILesson } from "@/types/lesson.types";
import { cn } from "@/lib/utils";
import { PlayCircle, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LessonSidebarProps {
  lessons: ILesson[];
  selectedLessonId: string | null;
  onSelectLesson: (lessonId: string) => void;
  completedLessonIds?: string[];
}

export function LessonSidebar({
  lessons,
  selectedLessonId,
  onSelectLesson,
  completedLessonIds = [],
}: LessonSidebarProps) {
  // Sort lessons by order
  const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col h-full bg-card border-r w-80 shrink-0">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Course Content</h2>
        <p className="text-sm text-muted-foreground">{lessons.length} Lessons</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {sortedLessons.map((lesson) => {
            const isSelected = selectedLessonId === lesson.id;
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isVideo = lesson.type === "video";

            return (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={cn(
                  "flex items-start gap-3 w-full p-3 rounded-lg text-left transition-colors hover:bg-accent group",
                  isSelected ? "bg-accent" : "transparent",
                )}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : isVideo ? (
                    <PlayCircle className={cn("w-5 h-5", isSelected ? "text-primary" : "text-muted-foreground")} />
                  ) : (
                    <FileText className={cn("w-5 h-5", isSelected ? "text-primary" : "text-muted-foreground")} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">Lesson {lesson.order}</span>
                    <Badge variant="outline" className="text-[10px] px-1 py-0 h-4 uppercase">
                      {lesson.type}
                    </Badge>
                  </div>
                  <h3 className={cn("text-sm font-medium line-clamp-2 leading-snug", isSelected && "text-primary")}>
                    {lesson.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
