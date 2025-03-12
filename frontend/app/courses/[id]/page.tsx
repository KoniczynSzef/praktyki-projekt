"use client";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CourseSignUpModal } from "@/components/course-sign-up-modal";
import { Course } from "@/app/types/course";
import { useEffect, useState } from "react";
import { getCourseById } from "@/api/courses/get-course-by-id";
import { getSuggestedCoursesByCourseId } from "@/api/courses/get-suggested-courses-by-course-id";

function SuggestedCourseCard({ course }: { course: Course }) {
  return (
    <Card>
      <CardContent className="p-4">
        {course.imageURL ? (
          <img
            src={course.imageURL || "/placeholder.svg"}
            alt={course.name}
            className="mb-4 h-32 w-full object-cover"
          />
        ) : (
          <div className="mb-4 h-32 w-full bg-gray-200 dark:bg-gray-700"></div>
        )}
        <h3 className="mb-2 text-lg font-semibold">{course.name}</h3>
        <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
          {course.instructor}
        </p>
        <Badge>{course.badge}</Badge>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="font-bold">${course.price.toFixed(2)}</span>
        <Button asChild variant="outline" size="sm">
          <Link href={`/courses/${course.id}`}>Learn More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function CoursePage({ params }: { params: { id: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [suggestedCourses, setSuggestedCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function handleGetCourseById() {
      setCourse(await getCourseById(params.id));
      setSuggestedCourses(await getSuggestedCoursesByCourseId(params.id));
    }

    handleGetCourseById();
  }, []);

  if (!course) {
    return "loading...";
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge className="mb-2">{course.badge}</Badge>
            <h1 className="text-3xl font-bold md:text-4xl">{course.name}</h1>
            {course.imageURL ? (
              <img
                src={course.imageURL || "/placeholder.svg"}
                alt={course.name}
                className="w-full rounded-lg object-cover shadow-lg md:h-64"
              />
            ) : (
              <div className="h-48 w-full rounded-lg bg-gray-200 shadow-lg dark:bg-gray-700 md:h-64"></div>
            )}
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {course.description}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-blue-600">
                ${course.price.toFixed(2)}
              </p>
              <CourseSignUpModal
                courseId={course.id}
                courseTitle={course.name}
              />
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div>
            <h2 className="mb-4 text-2xl font-bold">Course Plan</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Start Date
                </h3>
                <p>{String(course.startDate)}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Duration
                </h3>
                <p>{course.durationInDays}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Instructor
                </h3>
                <p>{course.instructor}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Level
                </h3>
                <p>{course.level}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Members
                </h3>
                <p>
                  {course.signedMembers} / {course.maxMembers}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Format
                </h3>
                <p>{course.isRemote ? "Remote" : "In-person"}</p>
              </div>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700" />

          <div>
            <h2 className="mb-4 text-2xl font-bold">Syllabus</h2>
            <ul className="list-inside list-disc space-y-2">
              {course.syllabusElements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-8 text-2xl font-bold">Suggested Courses</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {suggestedCourses.map((suggestedCourse) => (
                <SuggestedCourseCard
                  key={suggestedCourse.id}
                  course={suggestedCourse}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
