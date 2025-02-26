import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CreateCourseForm } from "@/components/dashboard/create-course-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CreateCoursePage() {
  return (
    <DashboardShell>
      <div className="container max-w-4xl">
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="secondary" asChild>
            <Link href="/dashboard">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">Create New Course</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Fill in the details below to create a new course.</p>
          </div>
          <CreateCourseForm />
        </div>
      </div>
    </DashboardShell>
  )
}

