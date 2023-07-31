import './styles.css'

const Forecast = () => {
	return (
		<div className="forecast--data">
			<h2 className="forecast--day">Sunday</h2>
			<div className="weather--data">
				<div className='weather--data-inner'>
					<img alt="Weather Icon" className="weather--icon" />
					<div className="weather--temperature">
						25
						<span style={{ fontSize: "0.4em", verticalAlign: "super" }}>&#8451;</span>
					</div>
				</div>
				<div className="weather--city">
					Berlin
				</div>
			</div>
		</div>
	)
}

export default Forecast