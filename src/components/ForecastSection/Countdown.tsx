import { useEffect, useState } from 'react';

import useCountdown from '../../hooks/useCountdown';
import { selectCurrentTrip } from '../../redux/store/selectors';
import { useAppSelector } from '../../redux/store/store';
import calculateTimeUnits from '../../utils/functions/calculateTimeUnits';
import './index.css';


const Countdown = () => {
	const trip = useAppSelector(selectCurrentTrip);
	const { difference } = useCountdown(trip!);

	const [remainingDifference, setRemainingDifference] = useState(difference);

	useEffect(() => {
		setRemainingDifference(difference);
		const interval = setInterval(() => {
			setRemainingDifference(prevDifference => prevDifference - 1000);
		}, 1000);

		return () => clearInterval(interval);
	}, [difference, trip]);

	const dynamicTimeBetween = calculateTimeUnits(remainingDifference);

	return (
		<div className="countdown">
			{Object.entries(dynamicTimeBetween).map(([unit, value]) => (
				<div className='countdown--elements' key={unit} >
					<span className="countdown__value">{value}</span>
					<span className="countdown__unit">{unit}</span>
				</div>
			))}
		</div>
	);
}

export default Countdown;

