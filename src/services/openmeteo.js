
import { fetchJson } from "./api";

const HISTORY_API =
  import.meta.env.VITE_HISTORY_API ||
  "https://archive-api.open-meteo.com/v1/archive";

export async function getLast5DaysWeather(lat, lon) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m&past_days=5&forecast_days=1&timezone=auto`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to fetch historical weather");
  }

  const data = await response.json();

  const dailyData = {};

  data.hourly.time.forEach((time, index) => {
    const date = time.split("T")[0];

    if (!dailyData[date]) {
      dailyData[date] = {
        temperatures: [],
        humidities: []
      };
    }

    dailyData[date].temperatures.push(
      data.hourly.temperature_2m[index]
    );

    dailyData[date].humidities.push(
      data.hourly.relative_humidity_2m[index]
    );
  });

  return Object.entries(dailyData)
    .slice(0, 5)
    .map(([date, values]) => ({
      date,
      temperature: (
        values.temperatures.reduce((a, b) => a + b, 0) /
        values.temperatures.length
      ).toFixed(1),
      humidity: (
        values.humidities.reduce((a, b) => a + b, 0) /
        values.humidities.length
      ).toFixed(1)
    }));
}

export async function getHistoricalWeather(lat, lon, date) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    start_date: date,
    end_date: date,
    hourly: "temperature_2m,relative_humidity_2m",
    timezone: "auto",
  });
  const data = await fetchJson(
    `${HISTORY_API}?${params}`,
    "Historical data unavailable"
  );

  const temperatures = data.hourly?.temperature_2m?.filter(Number.isFinite) ?? [];
  const humidities =
    data.hourly?.relative_humidity_2m?.filter(Number.isFinite) ?? [];

  if (!temperatures.length || !humidities.length) {
    throw new Error("Historical data unavailable");
  }

  return {
    temperature: (
      temperatures.reduce((sum, value) => sum + value, 0) /
      temperatures.length
    ).toFixed(1),
    humidity: (
      humidities.reduce((sum, value) => sum + value, 0) / humidities.length
    ).toFixed(1),
  };
}
