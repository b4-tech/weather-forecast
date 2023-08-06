import Countdown from "./Countdown"
import Forecast from "./Forecast"
import UserNavigation from "./UserNavigation"
import './index.css'

const ForecastSection = () => {
	return (
		<div className="forecast-section">
			<UserNavigation />
			<Forecast />
			<Countdown />
		</div>
	)
}

export default ForecastSection