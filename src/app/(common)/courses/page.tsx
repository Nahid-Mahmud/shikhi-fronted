"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useGetAllCoursesQuery } from "@/redux/features/course/course.api";
import { ICourse } from "@/types/course.types";
import { useDebounce } from "@/hooks/use-debounce";
import Image from "next/image";

const LIMIT = 9;

export default function AllCourses() {
  const [search, setSearch] = useState("");
  const [isFree, setIsFree] = useState<"all" | "free" | "paid">("all");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 500);

  const queryParams = {
    ...(debouncedSearch && { search: debouncedSearch }),
    ...(isFree === "free" && { isFree: true }),
    ...(isFree === "paid" && { isFree: false }),
    page,
    limit: LIMIT,
  };

  const { data: coursesResponse, isLoading, isError } = useGetAllCoursesQuery(queryParams);

  const courses = coursesResponse?.data || [];
  const meta = coursesResponse?.meta;
  const totalPages = meta?.totalPages ?? 1;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // reset to page 1 on new search
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsFree(e.target.value as "all" | "free" | "paid");
    setPage(1); // reset to page 1 on filter change
  };

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
                  value={search}
                  onChange={handleSearchChange}
                  placeholder="Search courses"
                  className="flex-1 sm:flex-none px-4 py-2 rounded-lg border bg-card text-foreground placeholder-muted-foreground"
                />
                <select
                  value={isFree}
                  onChange={handleFilterChange}
                  className="px-3 py-2 rounded-lg border bg-card text-foreground"
                >
                  <option value="all">All Prices</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
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
                  {courses.map((course: ICourse) => (
                    <div
                      key={course.id}
                      className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                    >
                      {/* <div
                        className="h-40 bg-primary/10 rounded-lg mb-4 w-full bg-cover bg-center"
                        style={{
                          backgroundImage: course.thumbnail ? `url(${course.thumbnail})` : undefined,
                        }}
                      >
                        {!course.thumbnail && (
                          <div className="w-full h-full flex items-center justify-center text-primary/40 font-bold">
                            Course Thumbnail
                          </div>
                        )}
                      </div> */}
                      <div>
                        <Image
                          src={course?.thumbnail || ""}
                          alt={course.title}
                          width={500}
                          height={500}
                          className="w-full h-40 bg-primary/10 rounded-lg mb-4 bg-cover bg-center"
                        />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-1">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {course.description || "No description available."}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <span className="px-2 py-1 bg-primary/10 rounded text-primary">
                          {course.isFree ? "Free" : `$${course.price}`}
                        </span>
                        <span className="capitalize text-xs text-muted-foreground">{course.status}</span>
                      </div>
                      <div className="flex items-center justify-end">
                        <Link href={`/courses/${course.id}`}>
                          <Button size="sm" className="flex items-center gap-2">
                            View <ArrowRight size={16} />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {courses.length === 0 && (
                  <p className="text-center text-muted-foreground py-12">No courses found matching your search.</p>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <ChevronLeft size={16} />
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPage(pageNum)}
                        className="min-w-[36px]"
                      >
                        {pageNum}
                      </Button>
                    ))}

                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    >
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                )}

                {meta && (
                  <p className="text-center text-xs text-muted-foreground mt-4">
                    Showing {courses.length} of {meta.total} courses
                  </p>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
