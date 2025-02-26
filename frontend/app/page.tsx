import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { CoursePreview } from "@/components/course-preview"
import { Testimonials } from "@/components/testimonials"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="space-y-24">
        <Hero />
        <CoursePreview />
        <Testimonials />
      </main>
    </div>
  )
}

