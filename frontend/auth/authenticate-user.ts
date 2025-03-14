import { BACKEND_API_URL } from "@/api/api-url";
import { User } from "./context/auth-context";

export async function authenticateUser() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return;
  }

  const response = await fetch(`${BACKEND_API_URL}/identity/manage/info`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      credentials: "include",
    },
  });

  const data = (await response.json()) as User;

  return data;
}
