export function signOut() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}
