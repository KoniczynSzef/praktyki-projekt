import { Course } from "@/app/types/course";
import { BACKEND_API_URL } from "../api-url";

export async function getAllCourses() {
  const response = await fetch(`${BACKEND_API_URL}/api/Course/GetAllCourses`);

  const data = (await response.json()) as Course[];

  return data;
}
