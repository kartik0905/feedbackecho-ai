const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function api(path, options = {}) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401) localStorage.removeItem("token");
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data;
}
