export interface Trip {
	destination: string;
	endDate: string;
	id: number;
	startDate: string;
}

interface Station {
	contribution: number
	distance: number
	id: string
	latitude: number
	longitude: number
	name: string
	quality: number
	useCount: number
}

interface Stations {
	D5621: Station
	EGLC: Station
	EGLL: Station
	EGWU: Station
}

export interface Day {
	cloudcover: number
	conditions: string
	datetime: string
	datetimeEpoch: number
	description: string
	dew: number
	feelslike: number
	feelslikemax: number
	feelslikemin: number
	humidity: number
	icon: string
	moonphase: number
	precip: number
	precipcover: number
	precipprob: number
	preciptype: string[]
	pressure: number
	severerisk: number
	snow: number
	snowdepth: number
	solarenergy: number
	solarradiation: number
	source: string
	stations: string[]
	sunrise: string
	sunriseEpoch: number
	sunset: string
	sunsetEpoch: number
	temp: number
	tempmax: number
	tempmin: number
	uvindex: number
	visibility: number
	winddir: number
	windgust: number
	windspeed: number
}

interface Root {
	address: string
	days: Day[]
	forecast?: Day[]
	latitude: number
	longitude: number
	queryCost: number
	resolvedAddress: string
	stations: Stations
	timezone: string
	tzoffset: number
}


export interface WeatherData extends Root { }


export interface ChangeEvent {
	target: {
		value: string;
	};
}

export interface IconType {
	default: string;
}

export interface FormData {
	destination: string;
	endDate: Date | null;
	id?: number
	startDate: Date | null;
}