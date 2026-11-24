import { fetchJson } from "./api";

const API =
  import.meta.env.VITE_GEO_API ||
  "https://geocoding-api.open-meteo.com/v1/search";

export async function getCoordinates(city) {
  const params = new URLSearchParams({ name: city, count: "1" });
  const data = await fetchJson(`${API}?${params}`, "City search failed");

  if (!data.results?.length) {
    throw new Error("City not found");
  }

  return data.results[0];
}