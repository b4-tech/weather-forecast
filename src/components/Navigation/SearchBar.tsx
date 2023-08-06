import React, { useState } from 'react';

import { ChangeEvent } from '../../models/models';
import './index.css'

const SearchBar: React.FC<{ setSearchText: (value: string) => void }> = ({ setSearchText }) => {
	const [search, setSearch] = useState('');

	const handleChange = ({ target: { value } }: ChangeEvent) => {
		setSearch(value);
		setSearchText(value);
	};

	return (
		<div className='search-bar--container'>
			<input
				onChange={handleChange}
				placeholder="Search your trip"
				type="text"
				value={search}
			/>
		</div>
	);
}

export default SearchBar;
