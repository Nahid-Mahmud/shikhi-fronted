"use client";

import { ILesson } from "@/types/lesson.types";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import MDXEditor to avoid SSR issues if it uses browser APIs
const ForwardRefEditor = dynamic(() => import("../ui/mdx-editor"), {
  ssr: false,
});

interface TextLessonProps {
  lesson: ILesson;
  onComplete?: () => void;
  isCompleted?: boolean;
}

export function TextLesson({ lesson, onComplete, isCompleted }: TextLessonProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-6 max-w-4xl mx-auto w-full">
        <div className="flex items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold">{lesson.title}</h1>
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

        <div className="prose dark:prose-invert max-w-none">
          {lesson.content ? (
            <div className="read-only-mdx">
              {/* We use the custom ForwardRefEditor but we need to make sure it's read only or just styling it as such */}
              <ForwardRefEditor markdown={lesson.content} />
              {/* Note: In a production app, we'd ideally have a specific viewer, 
                  but for now we'll use the editor. We might need to hide the toolbar via CSS in the page */}
            </div>
          ) : (
            <p className="text-muted-foreground italic">No content provided for this lesson.</p>
          )}
        </div>
      </div>

      <style jsx global>{`
        .read-only-mdx .mdx-editor-container {
          border: none;
          background: transparent;
        }
        .read-only-mdx .flex-wrap {
          display: none !important; /* Hide toolbar */
        }
        .read-only-mdx .mdxeditor {
          padding: 0;
        }
        .read-only-mdx .prose {
          min-height: auto;
        }
        .read-only-mdx [contenteditable="true"] {
          pointer-events: none; /* Make it read-only visually and prevents interaction */
        }
      `}</style>
    </div>
  );
}
