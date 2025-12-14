export const getToken = () =>
  typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

export const setToken = (token: string) =>
  localStorage.setItem("admin_token", token);

export const clearToken = () =>
  localStorage.removeItem("admin_token");
