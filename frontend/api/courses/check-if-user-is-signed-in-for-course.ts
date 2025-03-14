import { BACKEND_API_URL } from "../api-url";

export async function checkIfUserIsSignedInForCourse(
  userId: string,
  courseId: string,
) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return false;
  }

  const response = await fetch(
    `${BACKEND_API_URL}/api/User/CheckIfUserIsSignedInForCourse`,
    {
      method: "POST",
      body: JSON.stringify({
        userId,
        courseId,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  const isSignedIn = (await response.json()) as boolean;
  return isSignedIn;
}
