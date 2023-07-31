import './styles.css'
import Image from '../../assets/berlin.jpeg'

const TripModal = () => {
	return (
		<div className="trip-modal--container">
			<img className="trip-modal-city-img" src={Image} alt="city name" />
			<h3 className="trip-modal-city-name">Berlin</h3>
			<p className="trip-modal-date">14.07.2023 - 23.07.2023</p>
		</div>
	)
}

export default TripModal