import Logo from "../Navigation/Logo"
import ForecastList from "./ForecastList"
import TripList from "./TripList"
import './index.css'

const TripSection = () => {
	return (
		<div className="trip-section--container">
			<Logo />
			<TripList />
			<ForecastList />
		</div>
	)
}

export default TripSection