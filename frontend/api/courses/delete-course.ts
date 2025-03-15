import { isUserAdmin } from "@/auth/is-user-admin";

export async function deleteCourse(userId: string, courseId: string) {
  const token = localStorage.getItem("access_token");
  const isAdmin = await isUserAdmin(userId);

  if (!isAdmin || !token) {
    return "You don't have permissions to create courses.";
  }

  const response = await fetch(
    `http://localhost:5181/api/Course/DeleteCourse/${courseId}`,
    {
      method: "DELETE",
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
