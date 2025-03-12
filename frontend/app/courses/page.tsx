"use client";
import { Header } from "@/components/header";
import { CourseCard } from "@/components/course-card";
import { getAllCourses } from "@/api/courses/get-all-courses";
import { useEffect, useState } from "react";
import { Course } from "../types/course";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function handleGetAllCourses() {
      setCourses(await getAllCourses());
      setIsLoading(false);
    }

    handleGetAllCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">All Courses</h1>
        <div className="space-y-8">
          {isLoading && (
            <div className="flex flex-col gap-16">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton className="w-full h-64" key={i} />
              ))}
            </div>
          )}
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}
