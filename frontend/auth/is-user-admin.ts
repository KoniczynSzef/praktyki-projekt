import { BACKEND_API_URL } from "@/api/api-url";

export async function isUserAdmin(userId: string) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return false;
  }

  const response = await fetch(`${BACKEND_API_URL}/api/User/IsUserAdmin`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userId),
    credentials: "include",
  });

  if (!response.ok) {
    return false;
  }

  const isAdmin = (await response.json()) as boolean;
  return isAdmin;
}
