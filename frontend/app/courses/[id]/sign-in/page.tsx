import type { Metadata } from "next"
import CourseSignInPage from "./course-sign-in-page"

export const metadata: Metadata = {
  title: "Sign In to Course | LearnHub",
  description: "Sign in to your selected course on LearnHub",
}

export default function Page({ params }: { params: { id: string } }) {
  return <CourseSignInPage params={params} />
}

