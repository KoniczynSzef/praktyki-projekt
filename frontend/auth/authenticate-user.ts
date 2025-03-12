import { refreshToken } from "./refresh-token";

export async function authenticateUser() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return;
  }

  const response = await fetch("http://localhost:5181/identity/manage/info", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      credentials: "include",
    },
  });

  const data = (await response.json()) as {
    email: string;
  };

  return data;
}
