import { ApiLoginResponse } from "@/app/types/auth/ApiLoginResponse";

export function setToken(apiResponse: ApiLoginResponse) {
  localStorage.setItem("access_token", apiResponse.accessToken);
  localStorage.setItem("refresh_token", apiResponse.refreshToken);
}
