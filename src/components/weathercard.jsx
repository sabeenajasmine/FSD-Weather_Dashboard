function WeatherCard(props) {
  return (
    <div className="weather-card">
      <h2>{props.title}</h2>

      <h3>Temperature</h3>
      <p>{props.temperature} °C</p>

      <h3>Humidity</h3>
      <p>{props.humidity} %</p>
    </div>
  );
}

export default WeatherCard;