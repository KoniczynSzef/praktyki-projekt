import { Course, CreateCourseDto } from "@/app/types/course";
import { isUserAdmin } from "@/auth/is-user-admin";

export async function createCourse(userId: string, data: CreateCourseDto) {
  const token = localStorage.getItem("access_token");
  const isAdmin = await isUserAdmin(userId);

  if (!isAdmin || !token) {
    return "You don't have permissions to create courses.";
  }

  const response = await fetch(
    "http://localhost:5181/api/Course/CreateCourse",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    return "There was an error during creating course.";
  }

  const success = await response.text();
  return success;
}
