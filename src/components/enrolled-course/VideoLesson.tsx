"use client";

import dynamic from "next/dynamic";
import { ILesson } from "@/types/lesson.types";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface VideoLessonProps {
  lesson: ILesson;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export function VideoLesson({ lesson, onComplete, isCompleted }: VideoLessonProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="aspect-video bg-black w-full relative">
        {(ReactPlayer as any) && (
          <ReactPlayer
            url={lesson.videoUrl}
            controls
            width="100%"
            height="100%"
            style={{ position: "absolute", top: 0, left: 0 }}
          />
        )}
      </div>
      <div className="p-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <Button
            onClick={onComplete}
            variant={isCompleted ? "outline" : "default"}
            className="shrink-0"
            disabled={isCompleted}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {isCompleted ? "Completed" : "Mark as Complete"}
          </Button>
        </div>
        {lesson.description && (
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-muted-foreground">{lesson.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
