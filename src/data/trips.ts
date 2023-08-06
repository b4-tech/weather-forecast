import { Trip } from "../models/models";

const trips: Trip[] = [
	{
		destination: 'London',
		endDate: new Date(new Date().setDate(new Date().getDate() + 13)).toISOString().split('T')[0],
		id: 1,
		startDate: new Date().toISOString().split('T')[0]
	}
];

export default trips