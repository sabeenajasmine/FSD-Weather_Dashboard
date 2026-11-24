import WeatherCard from "./weathercard";

function HistoricalWeather(props) {
  return (
    <div>
      <h2>Historical Weather</h2>

      <form onSubmit={props.onSearch}>
        <input
          type="date"
          value={props.date}
          onChange={(e) => props.setDate(e.target.value)}
          required
        />

        <button type="submit">Search History</button>
      </form>

      {props.history && (
        <WeatherCard
          title="Historical Weather"
          temperature={props.history.temperature}
          humidity={props.history.humidity}
        />
      )}
    </div>
  );
}

export default HistoricalWeather;