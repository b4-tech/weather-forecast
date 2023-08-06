import { useMemo } from "react";

import { Trip } from "../models/models";
import calculateTimeUnits from "../utils/functions/calculateTimeUnits";

const useCountdown = (trip: Trip) => {

	const difference = useMemo(() => {
		const startDate = new Date(trip.startDate);
		const endDate = new Date(trip.endDate);
		return endDate.getTime() - startDate.getTime();
	}, [trip.startDate, trip.endDate]);

	const timeBetween = useMemo(() => {
		return calculateTimeUnits(difference);
	}, [difference]);

	return { difference, timeBetween };
}

export default useCountdown;
