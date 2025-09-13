import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
  const [weatherData, setWeatherData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/src/weatherData.json")
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => console.error("Error loading weather data:", err));
  }, []);

  // Filter cities by search input
  const filteredData = weatherData.filter((w) =>
    w.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        🌤 Weather App
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search for a city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Weather Cards Grid */}
      {filteredData.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredData.map((weather) => (
            <Link
              key={weather.id}
              to={`/weather/${weather.id}`}
              className="block"
            >
              <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center hover:shadow-xl hover:scale-105 transition transform duration-300">
                <img
                  src={weather.icon}
                  alt={weather.condition}
                  className="w-16 h-16"
                />
                <h2 className="text-xl font-semibold text-gray-900 mt-2">
                  {weather.city}
                </h2>
                <p className="text-lg text-gray-700">{weather.temperature}</p>
                <p className="text-gray-500">{weather.condition}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No cities found.</p>
      )}
    </div>
  );
}

export default HomePage;
