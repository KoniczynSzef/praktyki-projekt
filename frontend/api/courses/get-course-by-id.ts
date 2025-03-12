import { Course } from "@/app/types/course";

export async function getCourseById(id: string) {
  const response = await fetch(
    `http://localhost:5181/api/Course/GetCourseById/${id}`,
  );

  const course = (await response.json()) as Course;

  return course;
}
