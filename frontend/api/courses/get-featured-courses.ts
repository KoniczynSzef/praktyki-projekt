import { Course } from "@/app/types/course";

export async function getFeaturedCourses() {
  const response = await fetch(
    "http://localhost:5181/api/Course/GetFeaturedCourses/featured",
  );

  const courses = (await response.json()) as Course[];
  return courses;
}
