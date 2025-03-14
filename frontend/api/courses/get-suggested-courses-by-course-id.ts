import { Course } from "@/app/types/course";
import { BACKEND_API_URL } from "../api-url";

export async function getSuggestedCoursesByCourseId(id: string) {
  const response = await fetch(
    `${BACKEND_API_URL}/api/Course/GetSuggestedCoursesByCourseId/${id}/suggested`,
  );

  const course = (await response.json()) as Course[];

  return course;
}
