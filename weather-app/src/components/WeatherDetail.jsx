import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function WeatherDetail() {
  const { id } = useParams();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch("/src/weatherData.json")
      .then((res) => res.json())
      .then((data) => {
        const cityWeather = data.find((w) => w.id === parseInt(id));
        setWeather(cityWeather);
      })
      .catch((err) => console.error("Error loading weather detail:", err));
  }, [id]);

  if (!weather) {
    return <p className="text-center mt-10">Loading weather details...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        to="/"
        className="text-blue-500 hover:underline mb-6 inline-block"
      >
        ← Back to Home
      </Link>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
        <div className="flex flex-col items-center">
          <img src={weather.icon} alt={weather.condition} className="w-20 h-20" />
          <h1 className="text-3xl font-bold mt-4">{weather.city}</h1>
          <p className="text-xl text-gray-700 mt-2">{weather.temperature}</p>
          <p className="text-gray-500">{weather.condition}</p>
        </div>

        {/* Extra details section */}
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Humidity</h2>
            <p className="text-gray-600">
              {weather.humidity || "60% (mock value)"}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Wind Speed</h2>
            <p className="text-gray-600">
              {weather.wind || "15 km/h (mock value)"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherDetail;
