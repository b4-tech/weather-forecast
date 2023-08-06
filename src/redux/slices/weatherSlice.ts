import { PayloadAction, SerializedError, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { WeatherData } from '../../models/models';


export interface WeatherState {
	data: { [destination: string]: WeatherData | null };
	error: { [destination: string]: null | string };
	lastUpdated: { [destination: string]: null | number };
	status: { [destination: string]: 'failed' | 'idle' | 'loading' | 'succeeded' };
}

interface CustomError {
	message: string;
}

interface FetchWeatherMetaType {
	arg: { destination: string };
	rejectWithValue?: CustomError;
	requestId: string;
}

export const fetchWeather = createAsyncThunk<
	WeatherData,
	{ destination: string },
	{ rejectValue: CustomError }
>('weather/fetchWeather', async ({ destination }, thunkAPI) => {
	try {
		const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${destination}/today?unitGroup=metric&include=days&key=VYQTD4RH6FNJN4RBSN89PQRJN&contentType=json`);
		const data = await response.json();
		return data;
	} catch (error) {
		let errorMessage = 'Unknown error';
		if (error instanceof Error) {
			errorMessage = error.message;
		}
		return thunkAPI.rejectWithValue({ message: errorMessage });
	}
});

const weatherSlice = createSlice({
	extraReducers: (builder) => {
		builder
			.addCase(fetchWeather.pending, (state, action) => {
				state.status[action.meta.arg.destination] = 'loading';
				state.error[action.meta.arg.destination] = null;
			})

			.addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherData, string, FetchWeatherMetaType>) => {
				state.status[action.meta.arg.destination] = 'succeeded';
				state.data[action.meta.arg.destination] = action.payload;
				state.error[action.meta.arg.destination] = null;
			})
			.addCase(fetchWeather.rejected, (state, action) => {
				state.status[action.meta.arg.destination] = 'failed';
				if (action.payload) {
					const { message } = action.payload as SerializedError;
					state.error[action.meta.arg.destination] = message ?? null;
				} else {
					state.error[action.meta.arg.destination] = action.error.message ?? null;
				}
			});
	},
	initialState: {
		data: {},
		error: {},
		status: {},
	} as WeatherState,
	name: 'weather',
	reducers: {},
});

export default weatherSlice.reducer;