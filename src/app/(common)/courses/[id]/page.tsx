"use client";

import { useCreateCheckoutSessionMutation } from "@/redux/features/payment/payment.api";
import { useGetCourseByIdQuery } from "@/redux/features/course/course.api";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { BookOpen, Star, Users, Tag, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function CourseDetails() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const router = useRouter();
  const {
    data: courseRes,
    isLoading,
    isError,
  } = useGetCourseByIdQuery(id, {
    skip: !id,
  });
  const { data: meRes } = useGetMeQuery();
  const [createCheckoutSession, { isLoading: isCheckingOut }] = useCreateCheckoutSessionMutation();

  const course = courseRes?.data;
  const isLoggedIn = !!meRes?.data;

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to enroll in this course.");
      router.push("/login");
      return;
    }

    try {
      const result = await createCheckoutSession({ courseId: params.id }).unwrap();

      // Free course: enrolled directly
      if (result.data.enrolled) {
        toast.success("You have been enrolled in this free course!");
        router.push("/student/enrolled-course/" + params.id);
        return;
      }

      // Paid course: redirect to Stripe checkout
      if (result.data.url) {
        window.location.href = result.data.url;
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to start checkout. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Course not found</h2>
          <p className="text-muted-foreground">We couldn&apos;t find the course you&apos;re looking for.</p>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero */}
            <div className="rounded-2xl bg-card border p-6 space-y-4">
              {course.thumbnail ? (
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-56 object-cover rounded-xl"
                  height={150}
                  width={150}
                />
              ) : (
                <div className="h-56 bg-linear-to-br from-primary/20 to-primary/5 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-primary/40" />
                </div>
              )}
              <h1 className="text-3xl font-black text-foreground">{course.title}</h1>
              {course.description && <p className="text-muted-foreground leading-relaxed">{course.description}</p>}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {course.category && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full text-primary font-medium">
                    <Tag className="h-3 w-3" />
                    {course.category.name}
                  </span>
                )}
                <span className="px-3 py-1 bg-secondary rounded-full capitalize">{course.status}</span>
              </div>
            </div>

            {/* Instructor */}
            {course.instructor && (
              <div className="rounded-2xl bg-card border p-6">
                <h2 className="text-lg font-semibold mb-3">Instructor</h2>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {course.instructor.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{course.instructor.name}</span>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="rounded-2xl bg-card border p-6 space-y-5 sticky top-6">
              {/* Price */}
              <div className="text-center space-y-1">
                {course.isFree ? (
                  <div className="text-4xl font-black text-green-500">Free</div>
                ) : (
                  <div className="text-4xl font-black text-foreground">${course.price}</div>
                )}
              </div>

              {/* Enroll Button */}
              <button
                onClick={handleEnroll}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isCheckingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    {course.isFree ? "Enroll for Free" : "Enroll Now"}
                  </>
                )}
              </button>

              <Link
                href="/courses"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border font-medium text-sm hover:bg-secondary transition"
              >
                <ArrowLeft className="h-4 w-4" /> Back to courses
              </Link>

              {/* What you get */}
              <div className="pt-2 border-t space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span>Join other students</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
