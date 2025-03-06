import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface DashboardHeaderProps {
  heading: string
  text?: string
}

export function DashboardHeader({ heading, text }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 text-white mb-8">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && <p className="text-white/70">{text}</p>}
      </div>
      <Button variant="outline" className="border-white/20 hover:bg-white/10" asChild>
        <Link href="/dashboard/courses/create">
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Link>
      </Button>
    </div>
  )
}

