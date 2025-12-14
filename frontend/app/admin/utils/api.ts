import { getToken } from "./auth";

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function adminFetch(url: string) {
  const token = getToken();

  const res = await fetch(`${API}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    // Redirect to login instead of throwing error
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    return { success: false, data: [] };
  }

  return res.json();
}

export async function adminDelete(url: string) {
  const token = getToken();

  const res = await fetch(`${API}${url}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    return { success: false };
  }

  return res.json();
}
