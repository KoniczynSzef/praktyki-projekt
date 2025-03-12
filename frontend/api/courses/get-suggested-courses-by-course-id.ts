import { Course } from "@/app/types/course";

export async function getSuggestedCoursesByCourseId(id: string) {
  const response = await fetch(
    `http://localhost:5181/api/Course/GetSuggestedCoursesByCourseId/${id}/suggested`,
  );

  const course = (await response.json()) as Course[];

  return course;
}
