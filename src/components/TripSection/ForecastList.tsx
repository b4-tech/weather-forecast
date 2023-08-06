import { useCallback, useEffect } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { PulseLoader } from "react-spinners";

import usePreventBodyScroll from '../../hooks/usePreventBodyScroll';
import { Trip } from "../../models/models";
import { fetchForecast } from '../../redux/slices/forecastSlice';
import { selectCurrentTrip, selectForecastData, selectForecastStatus } from '../../redux/store/selectors';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import LeftButton from '../Buttons/LeftButton';
import OnWheel from '../Buttons/OnWheel';
import RightButton from '../Buttons/RightButton';
import ForecastDay from './ForecastDay';

const ForecastList = () => {
	const dispatch = useAppDispatch();
	const weather = useAppSelector(selectForecastData);
	const weatherStatus = useAppSelector(selectForecastStatus);
	const currentTrip = useAppSelector(selectCurrentTrip);
	const { disableScroll, enableScroll } = usePreventBodyScroll();


	const updateForecastList = useCallback((currentTrip: Trip) => {
		dispatch(fetchForecast({
			destination: currentTrip.destination,
			endDate: currentTrip.endDate,
			startDate: currentTrip.startDate
		}));
	}, [dispatch]);

	useEffect(() => {
		if (currentTrip) {
			const weatherData = weather[currentTrip.destination];

			if (!weatherData) {
				console.log('Initial fetch');
				updateForecastList(currentTrip);
			}
		}
	}, [dispatch, currentTrip, weather, updateForecastList]);


	if (weatherStatus === 'loading') {
		return <PulseLoader color="#fff" />
	}

	if (weatherStatus === 'succeeded') {
		if (currentTrip && weather[currentTrip.destination] && weather[currentTrip.destination].forecastData) {
			return (
				<div onMouseEnter={disableScroll} onMouseLeave={enableScroll} style={{ maxWidth: "66.66vw" }}>
					<ScrollMenu
						style={{
							flexDirection: 'column', gap: '20px'
						}}
						LeftArrow={LeftButton}
						RightArrow={RightButton}
						onWheel={OnWheel}
					>
						{weather[currentTrip.destination].forecastData.days.map((day, index) => (
							<div className="forecast-container " key={index}>
								<ForecastDay day={day} key={index} />
							</div>
						))}
					</ScrollMenu>
				</div>
			);
		}
	}

	return null;
}

export default ForecastList;
