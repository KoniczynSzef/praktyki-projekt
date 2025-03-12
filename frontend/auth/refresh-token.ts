import { ApiLoginResponse } from "@/app/types/auth/ApiLoginResponse";

type ApiRefreshTokenResponse = ApiLoginResponse;

export async function refreshToken() {
  const token = localStorage.getItem("refresh_token");

  if (!token) {
    return;
  }

  const response = await fetch("http://localhost:5181/identity/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken: token }),
  });

  if (!response.ok) {
    return;
  }

  const data = (await response.json()) as ApiRefreshTokenResponse;

  localStorage.setItem("access_token", data.accessToken);
  localStorage.setItem("refresh_token", data.refreshToken);

  return data;
}
