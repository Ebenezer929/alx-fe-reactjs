import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import WeatherDetail from "./components/WeatherDetail";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/weather/:id" element={<WeatherDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
