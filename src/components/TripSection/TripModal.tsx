import React, { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

import { Trip } from '../../models/models';
import { selectCurrentTrip } from '../../redux/store/selectors';
import { useAppSelector } from '../../redux/store/store';
import './index.css';

interface TripModalProps {
	onTripClick: (tripId: number) => void;
	trip: Trip;
}

const TripModalComponent: React.FC<TripModalProps> = ({ onTripClick, trip }) => {
	const { destination, endDate, id, startDate } = trip;
	const currentTrip = useAppSelector(selectCurrentTrip);

	const [tripImage, setTripImage] = useState<null | string>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => {
		setLoading(true);
		setError(false);

		import(`../../assets/cityImages/${destination.toLowerCase()}.jpeg`)
			.then((imageModule) => {
				setTripImage(imageModule.default);
			})
			.catch(() => {
				setError(true);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [destination]);

	return (
		<div
			className={`trip-modal--container ${id === currentTrip?.id ? 'active' : ''}`}
			onClick={() => onTripClick(id)}
		>
			{loading ? (
				<PulseLoader color="#fff" />
			) : (
				<>
					{tripImage && !error && <img alt={destination} className="trip-modal-destination-img" loading='lazy' src={tripImage} />}
					{error && <p>Failed to load trip image.</p>}
				</>
			)}
			<h3 className="trip-modal-destination-name">{destination}</h3>
			<p className="trip-modal-date">{startDate} - {endDate}</p>
		</div>
	)
}

const TripModal = React.memo(TripModalComponent);
export default TripModal;
