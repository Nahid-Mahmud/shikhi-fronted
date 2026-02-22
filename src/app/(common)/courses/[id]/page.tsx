import Link from "next/link";
import type { ICourseDetail, ICourseLesson } from "../../../../types/course.types";

type Params = { id: string };

export default function CourseDetails({ params }: { params: Params }) {
  const course: ICourseDetail = {
    slug: params.id,
    title: "Web Development Bootcamp",
    description:
      "Build modern websites and apps using HTML, CSS, and JavaScript. Includes projects, exercises and quizzes.",
    thumbnail: "",
    price: 29,
    isFree: false,
    level: "Beginner",
    students: "2,450",
    rating: 4.9,
    instructor: { name: "Ayesha Khan", id: "inst_1" },
    category: { name: "Development" },
    lessons: [
      { id: "l1", title: "Introduction & Setup", order: 1, type: "video" } as ICourseLesson,
      { id: "l2", title: "HTML Basics", order: 2, type: "text" } as ICourseLesson,
      { id: "l3", title: "CSS Layouts", order: 3, type: "video" } as ICourseLesson,
      { id: "l4", title: "JavaScript Essentials", order: 4, type: "video" } as ICourseLesson,
    ],
  };

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <p className="text-muted-foreground mt-2">We couldn&apos;t find the course you&apos;re looking for.</p>
          <div className="mt-6">
            <Link
              href="/courses"
              className="inline-flex items-center px-4 py-2 rounded bg-primary text-primary-foreground"
            >
              Back to courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-card p-6 mb-6">
              <div className="h-56 bg-primary/10 rounded mb-4" />
              <h1 className="text-3xl font-black text-foreground mb-2">{course.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="px-2 py-1 bg-primary/10 rounded text-primary">{course.level}</span>
                <span>•</span>
                <span>{course.students} students</span>
                <span>•</span>
                <span>⭐ {course.rating}</span>
              </div>
              <p className="text-muted-foreground mb-6">{course.description}</p>
            </div>

            <section className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Lessons</h2>
              <ol className="space-y-3">
                {course.lessons.map((lesson: ICourseLesson) => (
                  <li key={lesson.id} className="flex items-start justify-between p-3 rounded hover:bg-primary/5">
                    <div>
                      <div className="text-sm font-medium">{lesson.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {lesson.type} • Lesson {lesson.order}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">Preview</div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg bg-card p-6">
              <div className="text-sm text-muted-foreground mb-2">Instructor</div>
              <div className="font-medium">{course.instructor.name}</div>
            </div>

            <div className="rounded-lg bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="font-semibold text-foreground">{course.isFree ? "Free" : `$${course.price}`}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/checkout?course=${course.slug}`}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 rounded bg-primary text-primary-foreground"
                >
                  Enroll now
                </Link>
                <Link href="/courses" className="inline-flex items-center px-4 py-2 rounded border">
                  Back
                </Link>
              </div>
            </div>

            <div className="rounded-lg bg-card p-6">
              <div className="text-sm text-muted-foreground">Category</div>
              <div className="font-medium">{course.category?.name ?? "General"}</div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
