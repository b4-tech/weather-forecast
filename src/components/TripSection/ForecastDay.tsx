import React from "react";
import { FC, useEffect, useState } from "react";

import useDayOfWeek from "../../hooks/useDayOfWeek";
import { Day } from "../../models/models";

interface WeatherDayProps {
	day: Day;
}

const WeatherDayComponent: FC<WeatherDayProps> = ({ day }) => {
	const { datetime, icon, tempmax, tempmin } = day;
	const [dayIcon, setDayIcon] = useState<null | string>(null);
	const [error, setError] = useState<boolean>(false);

	const dayOfWeek = useDayOfWeek({ dateInput: datetime });

	useEffect(() => {
		if (icon) {
			import(`../../assets/weatherIcons/${icon}.svg`)
				.then((iconModule) => {
					setDayIcon(iconModule.default);
				})
				.catch(() => {
					setError(true);
				});
		}
	}, [icon]);

	return (
		<div className="forecast-modal--container">
			<p>{dayOfWeek}</p>
			{dayIcon && !error && (
				<img alt={icon} className="weather--icon" loading="lazy" src={dayIcon} />
			)}
			{error && <p>Failed to load weather icon.</p>}
			<p>{Math.trunc(tempmin)}<span>&deg;</span>/{Math.trunc(tempmax)}<span>&deg;</span></p>
		</div>
	);
};

const WeatherDay = React.memo(WeatherDayComponent)

export default WeatherDay;
