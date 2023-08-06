import { useEffect, useState } from 'react';

interface UseDayOfWeekProps {
	dateInput?: string;
}

const useDayOfWeek = ({ dateInput }: UseDayOfWeekProps = {}) => {
	const [dayOfWeek, setDayOfWeek] = useState('');

	useEffect(() => {
		const date = dateInput ? new Date(dateInput) : new Date();
		const currentDayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
		setDayOfWeek(currentDayOfWeek);
	}, [dateInput]);

	return dayOfWeek;
}

export default useDayOfWeek;
