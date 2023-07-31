import ForecastSection from "./components/ForecastSection/ForecastSection"
import TripSection from "./components/TripSection/TripSection"
const App = () => {

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "2" }}>
        <TripSection />
      </div>
      <div style={{ flex: "1" }}>
        <ForecastSection />
      </div>
    </div>
  )
}

export default App
