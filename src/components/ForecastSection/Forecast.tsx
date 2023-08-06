import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

import useCurrentDayOfWeek from '../../hooks/useDayOfWeek';
import { IconType } from '../../models/models';
import { fetchWeather } from '../../redux/slices/weatherSlice';
import { selectCurrentTrip, selectCurrentTripId } from '../../redux/store/selectors';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import './index.css'


const Forecast = () => {
	const dispatch = useAppDispatch();
	const currentTripId = useAppSelector(selectCurrentTripId);
	const currentTrip = useAppSelector(selectCurrentTrip);
	const weather = useAppSelector((state) => state.weatherToday.data[currentTrip!.destination]);

	const [icon, setIcon] = useState<IconType | null>(null);

	useEffect(() => {
		if (currentTrip) {
			dispatch(fetchWeather({ destination: currentTrip.destination }));
		}
	}, [dispatch, currentTrip, currentTripId]);


	useEffect(() => {
		if (weather && weather.days[0].icon) {
			import(`../../assets/weatherIcons/${weather.days[0].icon}.svg`)
				.then((icon) => {
					setIcon(icon);
				})
				.catch((err) => console.log(err));
		}
	}, [weather]);


	const dayOfWeek = useCurrentDayOfWeek()


	if (!weather) {
		return <PulseLoader color="#fff" cssOverride={{ paddingBottom: '25px', paddingLeft: "150px" }} />
	}

	return (
		<div className="forecast--data">
			<h2 className="forecast--day">{dayOfWeek}</h2>
			<div className="weather--data">
				<div className='weather--data-inner'>
					{icon && <img alt={weather.days[0].icon} className="weather--icon" loading='lazy' src={icon.default} />}
					<div className="weather--temperature">
						{Math.trunc(weather.days[0].temp)}
						<span style={{ fontSize: "0.4em", verticalAlign: "super" }}>&#8451;</span>
					</div>
				</div>
				<div className="weather--destination">
					{weather.address}
				</div>
			</div>
		</div>
	);
};

export default Forecast;
