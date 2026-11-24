function SearchBar(props) {
  return (
    <form onSubmit={props.onSearch}>
      <input
        type="text"
        placeholder="Enter city name"
        value={props.city}
        onChange={(e) => props.setCity(e.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;