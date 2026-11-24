
import WeatherCard from "./weathercard";

function CurrentWeather({ weather }) {
  if (!weather) return null;

  return (
    <WeatherCard
      title={`Current Weather - ${weather.city}`}
      temperature={weather.temperature}
      humidity={weather.humidity}
    />
  );
}

export default CurrentWeather;
