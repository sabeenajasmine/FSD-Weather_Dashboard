export async function fetchJson(url, errorMessage) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${errorMessage} (HTTP ${response.status})`);
  }

  if (!response.headers.get("content-type")?.includes("application/json")) {
    throw new Error(`${errorMessage}: the API returned a non-JSON response.`);
  }

  try {
    return await response.json();
  } catch {
    throw new Error(`${errorMessage}: the API returned invalid JSON.`);
  }
}
