import './styles.css'

const SearchBar = () => {
	return (
		<div className='search-bar--container'>
			<input className='seach-bar--input' type="text" placeholder="Search your trip" />
		</div>
	)
}

export default SearchBar