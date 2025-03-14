export async function isUserAdmin(userId: string) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return false;
  }

  const response = await fetch("http://localhost:5181/api/User/IsUserAdmin", {
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
