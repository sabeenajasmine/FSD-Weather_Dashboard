import { fetchJson } from "./api";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export async function getOpenWeather(lat, lon) {
  if (!API_KEY) {
    throw new Error("OpenWeather API key is not configured.");
  }

  const params = new URLSearchParams({
    lat,
    lon,
    appid: API_KEY,
    units: "metric",
  });
  const data = await fetchJson(
    `https://api.openweathermap.org/data/2.5/weather?${params}`,
    "Weather data not found"
  );

  return {
    temperature: data.main.temp,
    humidity: data.main.humidity,
    city: data.name
  };
}