import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "./types";

export const selectCurrentTripId = (state: RootState) => state.trips.currentTrip;

export const selectTrips = (state: RootState) => state.trips.list;

export const selectCurrentTrip = createSelector(
	[selectTrips, selectCurrentTripId],
	(trips, id) => trips.find(trip => trip.id === id)
);

export const selectWeatherTodayData = (state: RootState) => state.weatherToday.data;

export const selectCurrentTripWeather = createSelector(
	[selectWeatherTodayData, selectCurrentTrip],
	(weatherData, currentTrip) => currentTrip ? weatherData[currentTrip.destination] : null
);

export const selectForecastData = (state: RootState) => state.forecast.data;

export const selectForecastStatus = (state: RootState) => state.forecast.status;

export const selectCities = (state: RootState) => state.trips.cities;
