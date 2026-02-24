"use client";

import { useGetMyEnrolledCoursesQuery } from "@/redux/features/enrollment/enrollment.api";
import Link from "next/link";
import { BookOpen, Loader2, GraduationCap, ArrowRight, CheckCircle, Clock } from "lucide-react";
import Image from "next/image";

interface EnrolledCourse {
  id: string;
  status: string;
  progressPercentage: number;
  createdAt: string;
  course: {
    id: string;
    title: string;
    description?: string;
    thumbnail?: string;
    isFree: boolean;
    price: number;
    instructor?: { name: string };
  };
}

export default function StudentDashboardPage() {
  const { data, isLoading, isError } = useGetMyEnrolledCoursesQuery();
  const enrollments = (data?.data || []) as EnrolledCourse[];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            My Enrolled Courses
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Continue learning from where you left off.</p>
        </div>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
        >
          Browse Courses <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-center text-destructive">
          Failed to load your courses. Please refresh the page.
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && enrollments.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <BookOpen className="h-10 w-10 text-primary/40" />
          </div>
          <h2 className="text-xl font-semibold">No courses yet</h2>
          <p className="text-muted-foreground text-sm max-w-sm">
            You haven&apos;t enrolled in any courses. Explore our course library and start learning today!
          </p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
          >
            Browse Courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* Course Grid */}
      {!isLoading && enrollments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {enrollments.map((enrollment) => {
            const course = enrollment.course;
            const progress = enrollment.progressPercentage ?? 0;
            const isCompleted = enrollment.status === "completed";

            return (
              <div
                key={enrollment.id}
                className="rounded-2xl border bg-card overflow-hidden hover:shadow-md transition group"
              >
                {/* Thumbnail */}
                {course.thumbnail ? (
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                    height={600}
                    width={600}
                  />
                ) : (
                  <div className="w-full h-40 bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-primary/30" />
                  </div>
                )}

                <div className="p-5 space-y-3">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        isCompleted ? "bg-green-500/10 text-green-600" : "bg-blue-500/10 text-blue-600"
                      }`}
                    >
                      {isCompleted ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                      {isCompleted ? "Completed" : "In Progress"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-foreground leading-snug group-hover:text-primary transition line-clamp-2">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  {course.instructor && <p className="text-xs text-muted-foreground">by {course.instructor.name}</p>}

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-500"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/student/enrolled-course/${course.id}`}
                    className="mt-1 w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium hover:bg-primary hover:text-primary-foreground hover:border-primary transition"
                  >
                    {isCompleted ? "Review Course" : "Continue Learning"}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
