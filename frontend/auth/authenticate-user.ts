import { refreshToken } from "./refresh-token";

export async function authenticateUser() {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return;
  }

  const response = await fetch("http://localhost:5181/identity/manage/info", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    const data = await refreshToken();

    if (!data) {
      return;
    }

    const refreshResponse = await fetch(
      "http://localhost:5181/identity/manage/info",
      {
        headers: { Authorization: `Bearer ${data.accessToken}` },
      },
    );

    if (!refreshResponse.ok) {
      return;
    }

    const refreshData = (await refreshResponse.json()) as {
      email: string;
    };

    return refreshData;
  }

  const data = (await response.json()) as {
    email: string;
  };

  return data;
}
