import { Course } from "@/app/types/course";
import { BACKEND_API_URL } from "../api-url";

export async function getFeaturedCourses() {
  const response = await fetch(
    `${BACKEND_API_URL}/api/Course/GetFeaturedCourses/featured`,
  );

  const courses = (await response.json()) as Course[];
  return courses;
}
