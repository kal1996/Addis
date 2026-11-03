
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function apiFetch(
  path: string,
  options: RequestInit = {}
): Promise<Response> {
  // Get the JWT token saved during login.
  const token =
    typeof window !== "undefined"
      ? sessionStorage.getItem("addislink_token")
      : null;

  // Prepare request headers.
  const headers = new Headers(options.headers);

  // Add the JSON content type when appropriate.
  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  // Attach the JWT token when available.
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Send the request to the backend.
  const endpoint = `${API_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;

  return fetch(endpoint, {
    ...options,
    headers,
  });
}
