import Logo from "../Logo/Logo"
import SearchBar from "../SearchBar/SearchBar"
import TripList from "../TripList/TripList"
import './styles.css'

const TripSection = () => {
	return (
		<div className="trip-section--container">
			<Logo />
			<SearchBar />
			<TripList />
		</div>
	)
}

export default TripSection