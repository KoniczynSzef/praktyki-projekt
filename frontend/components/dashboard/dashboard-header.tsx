import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface DashboardHeaderProps {
  heading: string
  text?: string
}

export function DashboardHeader({ heading, text }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 mb-8">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl dark:text-white">{heading}</h1>
        {text && <p className="text-zinc-500 dark:text-zinc-400">{text}</p>}
      </div>
      <Button asChild>
        <Link href="/dashboard/courses/create">
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Link>
      </Button>
    </div>
  )
}

