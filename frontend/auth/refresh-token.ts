import { ApiLoginResponse } from "@/app/types/auth/ApiLoginResponse";
import { setToken } from "./set-token";
import { BACKEND_API_URL } from "@/api/api-url";

type ApiRefreshTokenResponse = ApiLoginResponse;

export async function refreshToken() {
  const token = localStorage.getItem("refresh_token");

  if (!token) {
    return;
  }

  const response = await fetch(`${BACKEND_API_URL}/identity/refresh`, {
    method: "POST",
    body: JSON.stringify({ refreshToken: token }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    return;
  }

  const data = (await response.json()) as ApiRefreshTokenResponse;

  setToken(data);

  return data;
}
