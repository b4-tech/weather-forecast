import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';

import forecastReducer from '../slices/forecastSlice';
import tripsReducer from '../slices/tripsSlice';
import weatherReducer from '../slices/weatherSlice';
import { AppDispatch, RootState } from './types';

const reducers = {
	forecast: forecastReducer,
	trips: tripsReducer,
	weatherToday: weatherReducer,
};

const rootReducer = combineReducers(reducers);

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	reducer: persistedReducer,
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
