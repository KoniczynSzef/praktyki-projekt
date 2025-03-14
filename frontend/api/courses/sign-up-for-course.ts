export async function signUpForCourse(courseId: string, userId: string) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    console.log("no token");
    return;
  }

  const response = await fetch(
    `http://localhost:5181/api/Course/SignUpForCourse/${courseId}/signup`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userId),
      credentials: "include",
    },
  );

  const data = await response.text();
  return data;
}
