import moment from "moment";

const calculateTimeUnits = (difference: number) => {
	const duration = moment.duration(difference);

	return {
		days: duration.days(),
		hours: duration.hours(),
		minutes: duration.minutes(),
		seconds: duration.seconds()
	};
};

export default calculateTimeUnits