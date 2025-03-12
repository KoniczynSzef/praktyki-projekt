import { Course } from "@/app/types/course";

export async function getAllCourses() {
  const response = await fetch(
    "http://localhost:5181/api/Course/GetAllCourses",
  );

  const data = (await response.json()) as Course[];

  return data;
}
