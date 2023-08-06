import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { WeatherData } from '../../models/models';


interface WeatherState {
	data: {
		[key: string]: {
			forecastData: WeatherData,
		}
	};
	error: null | string;
	status: 'failed' | 'idle' | 'loading' | 'succeeded';
}

const initialState: WeatherState = {
	data: {},
	error: null,
	status: 'idle',
};

export const fetchForecast = createAsyncThunk('forecast/fetchWeather', async ({ destination, endDate, startDate }: { destination: string, endDate: string, startDate: string }) => {
	const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${destination}/${startDate}/${endDate}?unitGroup=metric&include=days&key=VYQTD4RH6FNJN4RBSN89PQRJN&contentType=json`);
	const data = await response.json();
	return { data, destination };
});

const forecastSlice = createSlice({
	extraReducers: builder => {
		builder
			.addCase(fetchForecast.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchForecast.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data[action.payload.destination] = {
					forecastData: action.payload.data,
				};
				console.log('forecastData', action.payload.data)
			})
			.addCase(fetchForecast.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message ?? null;
			});
	},
	initialState,
	name: 'forecast',
	reducers: {
	},
});


export default forecastSlice.reducer