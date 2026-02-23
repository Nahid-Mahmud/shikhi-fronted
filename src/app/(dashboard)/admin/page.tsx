"use client";

import React from "react";
import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
} from "lucide-react";
import {
  useGetOverallStatsQuery,
  useGetEnrollmentGrowthQuery,
  useGetTopCoursesQuery,
  useGetCoursesByCategoryQuery,
  useGetRevenuePerCourseQuery,
  useGetGlobalCompletionRateQuery,
  useGetInstructorCompletionRatesQuery,
} from "@/redux/features/stats/stats.api";
import { StatCard } from "@/components/dashboard/StatCard";
import {
  EnrollmentGrowthChart,
  TopCoursesChart,
  CoursesByCategoryChart,
  RevenueChart,
} from "@/components/dashboard/DashboardCharts";
import { Skeleton } from "@/components/ui/skeleton";
import { IInstructorCompletionRateItem } from "@/types/stats.types";

export default function AdminDashboard() {
  const { data: overallStats, isLoading: isLoadingOverall } = useGetOverallStatsQuery();
  const { data: enrollmentGrowth, isLoading: isLoadingGrowth } = useGetEnrollmentGrowthQuery();
  const { data: topCourses, isLoading: isLoadingTop } = useGetTopCoursesQuery();
  const { data: byCategory, isLoading: isLoadingCategory } = useGetCoursesByCategoryQuery();
  const { data: revenueData, isLoading: isLoadingRevenue } = useGetRevenuePerCourseQuery();
  const { data: completionRate, isLoading: isLoadingCompletion } = useGetGlobalCompletionRateQuery();

  const { data: instructorStats, isLoading: isLoadingInstructor } = useGetInstructorCompletionRatesQuery();

  const stats = overallStats?.data;

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Admin Overview
          </h1>
          <p className="text-muted-foreground">Monitor platform performance and engagement metrics in real-time.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 rounded-full border text-sm font-medium">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Platform Stats
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {isLoadingOverall ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)
        ) : (
          <>
            <StatCard
              title="Total Courses"
              value={stats?.totalCourses || 0}
              icon={BookOpen}
              color="primary"
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Total Students"
              value={stats?.totalRegisteredStudents || 0}
              icon={Users}
              color="blue"
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Active Students"
              value={stats?.totalActiveStudents || 0}
              icon={Activity}
              color="green"
              trend={{ value: 5, isPositive: true }}
            />
            <StatCard
              title="Total Revenue"
              value={`$${stats?.totalRevenue?.toLocaleString() || 0}`}
              icon={DollarSign}
              color="orange"
              trend={{ value: 15, isPositive: true }}
            />
          </>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        {/* Main Charts Area */}
        <div className="lg:col-span-4 space-y-8">
          {/* Enrollment Growth */}
          <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-primary/10 rounded-xl">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Enrollment Growth</h3>
                  <p className="text-sm text-muted-foreground">Monthly student acquisition trend</p>
                </div>
              </div>
            </div>
            {isLoadingGrowth ? (
              <Skeleton className="h-[300px] w-full rounded-xl" />
            ) : (
              <EnrollmentGrowthChart data={enrollmentGrowth?.data || []} />
            )}
          </div>

          {/* Revenue Distribution */}
          <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-500/10 rounded-xl">
                  <BarChart3 className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Revenue per Course</h3>
                  <p className="text-sm text-muted-foreground">Top performing courses by revenue</p>
                </div>
              </div>
            </div>
            {isLoadingRevenue ? (
              <Skeleton className="h-[300px] w-full rounded-xl" />
            ) : (
              <RevenueChart data={revenueData?.data || []} />
            )}
          </div>

          {/* Instructor Performance Table */}
          <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 bg-blue-500/10 rounded-xl">
                <Users className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Instructor Performance</h3>
                <p className="text-sm text-muted-foreground">Completion rates by instructor</p>
              </div>
            </div>
            <div className="relative w-full overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground hover:bg-transparent">
                    <th className="h-12 px-4 text-left align-middle font-medium">Instructor</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">Enrollments</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">Completed</th>
                    <th className="h-12 px-4 text-right align-middle font-medium">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoadingInstructor
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <tr key={i} className="border-b">
                          <td className="p-4">
                            <Skeleton className="h-4 w-32" />
                          </td>
                          <td className="p-4 text-center">
                            <Skeleton className="h-4 w-12 mx-auto" />
                          </td>
                          <td className="p-4 text-center">
                            <Skeleton className="h-4 w-12 mx-auto" />
                          </td>
                          <td className="p-4 text-right">
                            <Skeleton className="h-4 w-12 ml-auto" />
                          </td>
                        </tr>
                      ))
                    : instructorStats?.data?.map((item: IInstructorCompletionRateItem) => (
                        <tr key={item.instructorId} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle font-medium">{item.name || "Anonymous"}</td>
                          <td className="p-4 align-middle text-center">{item.totalEnrollments}</td>
                          <td className="p-4 align-middle text-center">{item.completedEnrollments}</td>
                          <td className="p-4 align-middle text-right font-semibold text-primary">
                            {item.completionRate}%
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Charts Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* Global Completion Rate */}
          <div className="rounded-2xl border bg-gradient-to-br from-primary/5 to-purple-500/5 backdrop-blur-sm p-6 shadow-sm border-primary/10">
            <div className="flex flex-col items-center justify-center py-6 text-center">
              <div className="relative flex items-center justify-center">
                <svg className="h-40 w-40">
                  <circle
                    className="text-muted/20"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="70"
                    cx="80"
                    cy="80"
                  />
                  <circle
                    className="text-primary transition-all duration-1000 ease-in-out"
                    strokeWidth="10"
                    strokeDasharray={439.6}
                    strokeDashoffset={439.6 - (439.6 * (completionRate?.data?.averageCompletionPercentage || 0)) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="70"
                    cx="80"
                    cy="80"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold tracking-tight">
                    {completionRate?.data?.averageCompletionPercentage || 0}%
                  </span>
                  <span className="text-xs text-muted-foreground uppercase font-semibold mt-1">Completion</span>
                </div>
              </div>
              <h4 className="mt-6 font-bold text-lg">Overall Platform Progress</h4>
              <p className="text-sm text-muted-foreground mt-2 px-6">
                Aggregate success rate across all courses and students.
              </p>
            </div>
          </div>

          {/* Top Courses */}
          <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow h-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                  <GraduationCap className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Top Courses</h3>
                  <p className="text-sm text-muted-foreground">Sorted by active enrollments</p>
                </div>
              </div>
            </div>
            {isLoadingTop ? (
              <Skeleton className="h-[300px] w-full rounded-xl" />
            ) : (
              <TopCoursesChart data={topCourses?.data || []} />
            )}
          </div>

          {/* Courses by Category */}
          <div className="rounded-2xl border bg-card/50 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-purple-500/10 rounded-xl">
                  <PieChartIcon className="h-5 w-5 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Curriculum Focus</h3>
                  <p className="text-sm text-muted-foreground">Distribution by category</p>
                </div>
              </div>
            </div>
            {isLoadingCategory ? (
              <Skeleton className="h-[300px] w-full rounded-xl" />
            ) : (
              <CoursesByCategoryChart data={byCategory?.data || []} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
