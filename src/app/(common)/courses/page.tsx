"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function AllCourses() {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("all");

  const courses = [
    {
      title: "Web Development Bootcamp",
      level: "Beginner",
      students: "2,450",
      rating: 4.9,
      description: "Build modern websites and apps using HTML, CSS, and JavaScript.",
      slug: "web-dev-bootcamp",
    },
    {
      title: "Data Science Fundamentals",
      level: "Intermediate",
      students: "3,120",
      rating: 4.8,
      description: "Intro to data analysis, visualization, and machine learning.",
      slug: "data-science-fundamentals",
    },
    {
      title: "Advanced React Patterns",
      level: "Advanced",
      students: "1,890",
      rating: 4.9,
      description: "Scale React apps with patterns and performance techniques.",
      slug: "advanced-react-patterns",
    },
    {
      title: "Python for Everybody",
      level: "Beginner",
      students: "4,000",
      rating: 4.7,
      description: "Learn Python from scratch and build real projects.",
      slug: "python-for-everybody",
    },
    {
      title: "Machine Learning Practical",
      level: "Advanced",
      students: "980",
      rating: 4.8,
      description: "Hands-on ML projects with scikit-learn and TensorFlow.",
      slug: "ml-practical",
    },
    {
      title: "UI/UX Design Essentials",
      level: "Intermediate",
      students: "1,320",
      rating: 4.6,
      description: "Design beautiful, usable interfaces with real-world workflows.",
      slug: "ui-ux-essentials",
    },
    {
      title: "Backend APIs with Node.js",
      level: "Intermediate",
      students: "2,100",
      rating: 4.8,
      description: "Design and deploy robust REST and GraphQL APIs.",
      slug: "backend-nodejs",
    },
    {
      title: "DevOps Fundamentals",
      level: "Advanced",
      students: "710",
      rating: 4.5,
      description: "CI/CD, containers, and deployment best practices.",
      slug: "devops-fundamentals",
    },
    {
      title: "Product Management 101",
      level: "Beginner",
      students: "1,150",
      rating: 4.4,
      description: "Roadmaps, discovery, and stakeholder alignment for PMs.",
      slug: "product-management-101",
    },
  ];

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) => c.title.toLowerCase().includes(query.toLowerCase()) && (level === "all" || c.level === level),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [query, level],
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.map((course) => (
                <div
                  key={course.slug}
                  className="p-6 rounded-lg border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="h-40 bg-primary/10 rounded-lg mb-4"></div>
                  <h3 className="font-semibold text-foreground mb-2">{course.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="px-2 py-1 bg-primary/10 rounded text-primary">{course.level}</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">{course.students} students</p>
                    <Link href={`/courses/${course.slug}`}>
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
          </div>
        </section>
      </main>
    </div>
  );
}
