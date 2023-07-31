import Countdown from "../Countdown/Countdown"
import Forecast from "../Forecast/Forecast"
import Navigation from "../Navigation/Navigation"
import './style.css'

const ForecastSection = () => {
	return (
		<div className="forecast-section--container">
			<Navigation />
			<Forecast />
			<Countdown />
		</div>
	)
}

export default ForecastSection