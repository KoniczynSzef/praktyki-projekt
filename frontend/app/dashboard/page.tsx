import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CourseList } from "@/components/dashboard/course-list"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Courses" text="Create and manage your courses." />
      <CourseList />
    </DashboardShell>
  )
}

