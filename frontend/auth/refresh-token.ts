import { ApiLoginResponse } from "@/app/types/auth/ApiLoginResponse";
import { setToken } from "./set-token";

type ApiRefreshTokenResponse = ApiLoginResponse;

export async function refreshToken() {
  const token = localStorage.getItem("refresh_token");

  if (!token) {
    return;
  }

  const response = await fetch("http://localhost:5181/identity/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken: token }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return;
  }

  const data = (await response.json()) as ApiRefreshTokenResponse;

  setToken(data);

  return data;
}
