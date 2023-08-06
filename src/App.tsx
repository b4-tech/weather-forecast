import "./App.css";
import ForecastSection from "./components/ForecastSection/ForecastSection";
import TripSection from "./components/TripSection/TripSection";

const App = () => {
  return (
    <div className="app-container">
      <div className="trip-section">
        <TripSection />
      </div>
      <div className="forecast-section">
        <ForecastSection />
      </div>
    </div>
  );
};

export default App;