import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [weatherData, setWeatherData] = useState({
    current: {
      city: "New York",
      temperature: 24,
      description: "Partly Cloudy",
      icon: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
      humidity: 65,
      wind: 5,
      feelsLike: 26
    },
    forecast: [
      {
        day: "Mon",
        date: "Sep 4",
        temperature: 26,
        description: "Sunny",
        icon: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
        low: 18
      },
      {
        day: "Tue",
        date: "Sep 5",
        temperature: 22,
        description: "Cloudy",
        icon: "https://cdn-icons-png.flaticon.com/512/414/414927.png",
        low: 16
      },
      {
        day: "Wed",
        date: "Sep 6",
        temperature: 19,
        description: "Rainy",
        icon: "https://cdn-icons-png.flaticon.com/512/3351/3351979.png",
        low: 15
      },
      {
        day: "Thu",
        date: "Sep 7",
        temperature: 21,
        description: "Partly Cloudy",
        icon: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
        low: 14
      },
      {
        day: "Fri",
        date: "Sep 8",
        temperature: 25,
        description: "Sunny",
        icon: "https://cdn-icons-png.flaticon.com/512/6974/6974833.png",
        low: 17
      }
    ]
  })
  const [cityInput, setCityInput] = useState('')
  const [recentSearches, setRecentSearches] = useState([])

  useEffect(() => {
    // Load recent searches from localStorage
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || []
    setRecentSearches(searches)
  }, [])

  const handleSearch = () => {
    if (cityInput.trim()) {
      // Update weather data with new city
      const newData = {...weatherData}
      newData.current.city = cityInput
      setWeatherData(newData)
      
      // Add to recent searches
      addToRecentSearches(cityInput)
      
      // Clear input
      setCityInput('')
    }
  }

  const addToRecentSearches = (city) => {
    const updatedSearches = recentSearches.filter(search => search !== city)
    updatedSearches.unshift(city)
    
    if (updatedSearches.length > 5) {
      updatedSearches.pop()
    }
    
    setRecentSearches(updatedSearches)
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches))
  }

  const handleRecentSearchClick = (city) => {
    setCityInput(city)
    const newData = {...weatherData}
    newData.current.city = city
    setWeatherData(newData)
  }

  return (
    <div className="gradient-bg min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Weather Forecast</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Check current conditions and 5-day forecasts for cities around the world</p>
        </header>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-6 mb-10 search-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-3/4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <i className="fas fa-search text-gray-400"></i>
                </div>
                <input 
                  type="text" 
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Enter city name..." 
                  className="w-full pl-10 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
              </div>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full md:w-1/4 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <i className="fas fa-search"></i> Search
            </button>
          </div>
        </div>

        {/* Current Weather */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 weather-card">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200">Current Weather</h2>
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row items-center mb-6 lg:mb-0">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-8">
                <img src={weatherData.current.icon} alt="Weather Icon" className="w-32 h-32" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-bold text-gray-800 mb-2">{weatherData.current.city}</h3>
                <p className="text-xl text-gray-600 mb-4">{weatherData.current.description}</p>
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
                    <i className="fas fa-wind text-blue-500 mr-2"></i>
                    <span className="text-gray-700">Wind: {weatherData.current.wind} km/h</span>
                  </div>
                  <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
                    <i className="fas fa-tint text-blue-500 mr-2"></i>
                    <span className="text-gray-700">Humidity: {weatherData.current.humidity}%</span>
                  </div>
                  <div className="flex items-center bg-blue-50 rounded-full px-4 py-2">
                    <i className="fas fa-temperature-high text-blue-500 mr-2"></i>
                    <span className="text-gray-700">Feels like {weatherData.current.feelsLike}°C</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="temperature-display text-center lg:text-right">
              <span>{weatherData.current.temperature}°C</span>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">5-Day Forecast</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="bg-white rounded-xl p-5 text-center weather-card shadow-md hover:shadow-xl">
              <p className="font-bold text-gray-800 text-lg">{day.day}</p>
              <p className="text-gray-500 text-sm mb-3">{day.date}</p>
              <img src={day.icon} alt={day.description} className="mx-auto my-4 w-16 h-16" />
              <p className="text-gray-600 mb-2">{day.description}</p>
              <div className="flex justify-center items-center gap-3">
                <span className="text-2xl font-bold text-blue-600">{day.temperature}°</span>
                <span className="text-gray-400">{day.low}°</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Searches */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 pb-4 border-b border-gray-200">Recent Searches</h2>
          <div className="flex flex-wrap gap-3">
            {recentSearches.map((city, index) => (
              <div 
                key={index} 
                onClick={() => handleRecentSearchClick(city)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-full px-5 py-2 cursor-pointer transition-colors duration-300 flex items-center gap-2"
              >
                <i className="fas fa-map-marker-alt"></i> {city}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
