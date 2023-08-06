import { useCallback, useEffect, useState } from "react";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import usePreventBodyScroll from "../../hooks/usePreventBodyScroll";
import { setCurrentTrip } from '../../redux/slices/tripsSlice';
import { selectTrips } from "../../redux/store/selectors";
import { useAppDispatch, useAppSelector } from "../../redux/store/store";
import AddTripForm from "../AddTripForm/AddTripForm";
import LeftButton from '../Buttons/LeftButton';
import OnWheel from '../Buttons/OnWheel';
import RightButton from '../Buttons/RightButton';
import SearchBar from '../Navigation/SearchBar';
import TripModal from "./TripModal";
import './index.css';

const TripList = () => {
	const [searchText, setSearchText] = useState('');
	const trips = useAppSelector(selectTrips);
	const [sortedTrips, setSortedTrips] = useState(trips);
	const [showForm, setShowForm] = useState(false);
	const { disableScroll, enableScroll } = usePreventBodyScroll();
	const dispatch = useAppDispatch();

	const filterAndSortTrips = useCallback(() => {
		const filteredTrips = searchText ? trips.filter(trip => trip.destination.toLowerCase().includes(searchText.toLowerCase())) : trips;

		setSortedTrips(
			[...filteredTrips].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
		);
	}, [trips, searchText]);

	useEffect(filterAndSortTrips, [filterAndSortTrips]);

	const toggleForm = useCallback(() => {
		if (!showForm) {
			setShowForm(true);
		} else {
			setShowForm(false);
		}
	}, [showForm]);


	return (
		<div style={{ maxWidth: "66.66vw" }}>
			<SearchBar setSearchText={setSearchText} />
			<div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
				<ScrollMenu LeftArrow={LeftButton} RightArrow={RightButton} onWheel={OnWheel}>
					{sortedTrips.map(trip => (
						<div className="tripItem" key={trip.id}>
							<TripModal onTripClick={(tripId) => dispatch(setCurrentTrip(tripId))} trip={trip} />
						</div>
					))}
					<button className='addTrip' onClick={toggleForm}>
						<span>+</span>
						Add trip
					</button>
					{showForm && <AddTripForm setShowForm={setShowForm} showForm={showForm} />}
				</ScrollMenu>
			</div>
		</div>
	);
};

export default TripList;
