"use client"

import { Header } from "@/components/header"
import { CourseSignInForm } from "@/components/course-sign-in-form"

export default function CourseSignInPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">Sign In to Course</h1>
        <CourseSignInForm courseId={params.id} />
      </main>
    </div>
  )
}

