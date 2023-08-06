import { createSlice } from '@reduxjs/toolkit';

import cities from '../../data/cities';
import trips from '../../data/trips';


export const tripsSlice = createSlice({
	initialState: { cities: cities, currentTrip: 1, list: trips },
	name: 'trips',
	reducers: {
		addTrip: (state, action) => {
			state.list.push(action.payload);
		},
		setCurrentTrip: (state, action) => {
			state.currentTrip = action.payload;
		},
		setTrips: (state, action) => {
			state.list = action.payload;
		},
	},
});

export const { addTrip, setCurrentTrip, setTrips } = tripsSlice.actions;

export default tripsSlice.reducer;