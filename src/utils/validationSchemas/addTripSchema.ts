import * as yup from 'yup';

import cities from '../../data/cities';

const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 15);

export const addTripSchema = yup.object().shape({
	destination: yup.string().oneOf(cities, 'Please select a valid city').required('City is required'),
	endDate: yup.date().required("End date is required").nullable()
		.min(yup.ref('startDate'), 'End date cannot be before start date')
		.max(maxDate, "End date must be within the next 15 days"),
	startDate: yup.date().required("Start date is required").nullable()
		.min(new Date(), "Start date cannot be in the past")
		.max(maxDate, "Start date must be within the next 15 days"),
});
