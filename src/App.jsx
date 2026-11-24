
import { useState } from "react";

import SearchBar from "./components/searchbar";
import CurrentWeather from "./components/currentweather";
import HistoricalWeather from "./components/historicalweather";

import { getCoordinates } from "./services/geocodingapi";
import { getOpenWeather } from "./services/openweatherapi";
import { getHistoricalWeather } from "./services/openmeteo";

import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState(null);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setHistory(null);

      const place = await getCoordinates(city);

      setLocation(place);

      const data = await getOpenWeather(
        place.latitude,
        place.longitude
      );

      setWeather(data);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleHistory(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setHistory(null);

      const data = await getHistoricalWeather(
        location.latitude,
        location.longitude,
        date
      );

      setHistory({
        ...data,
        city: location.name
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">

      <h1>Weather App</h1>

      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
      />

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      <CurrentWeather weather={weather} />

      {location && (
        <HistoricalWeather
          history={history}
          date={date}
          setDate={setDate}
          onSearch={handleHistory}
        />
      )}

    </div>
  );
}

export default App;
