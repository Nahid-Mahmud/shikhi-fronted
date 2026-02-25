"use client";

import type { LucideIcon } from "lucide-react";
import { BookOpen, GraduationCap, LayoutDashboard, LibraryBig, PlusCircle, Tag, Users } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import Link from "next/link";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: { title: string; url: string }[];
};

const adminNav: NavItem[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
    isActive: true,
    items: [{ title: "Overview", url: "/admin" }],
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
    items: [{ title: "All Users", url: "/admin/users" }],
  },
  {
    title: "Categories",
    url: "/admin/category",
    icon: Tag,
    items: [{ title: "Manage Categories", url: "/admin/category" }],
  },
];

const instructorNav: NavItem[] = [
  {
    title: "My Courses",
    url: "/instructor/",
    icon: LibraryBig,
    items: [{ title: "All Courses", url: "/instructor/" }],
  },
  {
    title: "Create Course",
    url: "/instructor/create-course",
    icon: PlusCircle,
    items: [{ title: "New Course", url: "/instructor/create-course" }],
  },
];

const studentNav: NavItem[] = [
  {
    title: "Dashboard",
    url: "/student",
    icon: LayoutDashboard,
    isActive: true,
    items: [{ title: "Overview", url: "/student" }],
  },
  {
    title: "Enrolled Courses",
    url: "/student/enrolled-course",
    icon: GraduationCap,
    items: [{ title: "My Learning", url: "/student/enrolled-course" }],
  },
  {
    title: "Browse Courses",
    url: "/courses",
    icon: BookOpen,
    items: [{ title: "All Courses", url: "/courses" }],
  },
];

const navByRole: Record<string, NavItem[]> = {
  admin: adminNav,
  super_admin: adminNav,
  instructor: instructorNav,
  student: studentNav,
};

function AppBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">TalentPull</span>
              <span className="truncate text-xs text-muted-foreground">Learning Platform</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data, isLoading } = useGetMeQuery();
  const user = data?.data;

  const navItems = navByRole[user?.role ?? ""] ?? [];

  const navUser = {
    name: user?.name ?? "...",
    email: user?.email ?? "...",
    avatar: "",
  };

  if (isLoading) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <AppBrand />
        </SidebarHeader>
        <SidebarContent>
          <div className="px-3 py-2">
            {/* Group label skeleton */}
            <div className="mb-2 h-3 w-16 animate-pulse rounded bg-muted" />
            {/* Nav item skeletons */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-1 flex items-center gap-2 rounded-md px-2 py-2">
                <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                <div className="h-3 flex-1 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
            <div className="flex flex-1 flex-col gap-1">
              <div className="h-3 w-24 animate-pulse rounded bg-muted" />
              <div className="h-2 w-32 animate-pulse rounded bg-muted" />
            </div>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppBrand />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={navUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
