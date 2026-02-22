export interface IOverallStats {
  totalCourses: number;
  totalRegisteredStudents: number;
  totalInstructors: number;
  totalRevenue: number;
  totalActiveStudents: number;
}

export interface IEnrollmentGrowthItem {
  date: string; 
  count: number;
}

export interface ITopCourseItem {
  id: string;
  title: string;
  enrollments: number;
}

export interface IRevenuePerCourseItem {
  courseId: string | null;
  title: string;
  revenue: number;
}

export interface IInstructorCompletionRateItem {
  instructorId: string;
  name: string | null;
  completionRate: number;
  totalEnrollments: number;
  completedEnrollments: number;
}

export interface ICoursesByCategoryItem {
  categoryId: string;
  name: string;
  courseCount: number;
}

export interface IGlobalCompletionRate {
  averageCompletionPercentage: number;
}
