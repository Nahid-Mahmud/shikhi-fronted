"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useGetAllCoursesQuery } from "@/redux/features/course/course.api";
import { ICourse } from "@/types/course.types";

export default function AllCourses() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");

  const { data: coursesResponse, isLoading, isError } = useGetAllCoursesQuery();

  const courses = coursesResponse?.data || [];

  const filtered = useMemo(
    () =>
      courses.filter(
        (c: ICourse) =>
          c.title.toLowerCase().includes(query.toLowerCase()) &&
          (level === "all" || (c as any).level === level),
      ),
    [query, level, courses],
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="w-full">
        <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground">All Courses</h1>
                <p className="text-muted-foreground mt-2">
                  Browse our complete course catalog and find the right path for you.
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search courses"
                  className="flex-1 sm:flex-none px-4 py-2 rounded-lg border bg-card text-foreground placeholder-muted-foreground"
                />
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="px-3 py-2 rounded-lg border bg-card text-foreground"
                >
                  <option value="all">All levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-primary" size={48} />
              </div>
            ) : isError ? (
              <div className="text-center text-destructive py-12">
                <p>Failed to load courses. Please try again later.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filtered.map((course: ICourse) => (
                    <div
                      key={course.id}
                      className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                    >
                      <div
                        className="h-40 bg-primary/10 rounded-lg mb-4 bg-cover bg-center"
                        style={{
                          backgroundImage: course.thumbnail ? `url(${course.thumbnail})` : undefined,
                        }}
                      >
                        {!course.thumbnail && (
                          <div className="w-full h-full flex items-center justify-center text-primary/40 font-bold">
                            Course Thumbnail
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {course.description || "No description available."}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span className="px-2 py-1 bg-primary/10 rounded text-primary">
                          {(course as any).level || "All Levels"}
                        </span>
                        <span>⭐ {(course as any).rating || "4.5"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          {(course as any).students || "0"} students
                        </p>
                        <Link href={`/courses/${course.id}`}>
                          <Button size="sm" className="flex items-center gap-2">
                            View <ArrowRight size={16} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {filtered.length === 0 && (
                  <p className="text-center text-muted-foreground py-12">No courses found matching your search.</p>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
