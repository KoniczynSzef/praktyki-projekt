"use client";
import { Header } from "@/components/header";
import { CourseCard } from "@/components/course-card";
import { getAllCourses } from "@/api/courses/get-all-courses";
import { useEffect, useState } from "react";
import { Course } from "../types/course";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function handleGetAllCourses() {
      setCourses(await getAllCourses());
    }

    handleGetAllCourses();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-4xl font-bold">All Courses</h1>
        <div className="mb-8">{/* <CourseSearch onSearch={() => {}} /> */}</div>
        <div className="space-y-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}
