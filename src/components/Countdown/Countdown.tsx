import React, { useState, useEffect } from 'react';
import './styles.css'

interface TimeLeft {
	days?: number;
	hours?: number;
	minutes?: number;
	seconds?: number;
}

const Countdown: React.FC = () => {
	const eventDate = "2024-12-31T00:00:00";

	const calculateTimeLeft = (): TimeLeft => {
		const difference = +new Date(eventDate) - +new Date();
		let timeLeft: TimeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			};
		}

		return timeLeft;
	};

	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	});

	return (
		<div className="countdown">
			{Object.entries(timeLeft).map(([unit, value]) => (
				<div key={unit} className='countdown--elements' >
					<span className="countdown__value">{value}</span>
					<span className="countdown__unit">{unit}</span>
				</div>
			))
			}
		</div >
	);
};

export default Countdown;
