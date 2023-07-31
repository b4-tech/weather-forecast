import './styles.css'
import logo from '../../assets/penguin.svg'

const Navigation = () => {
	return (
		<div className="navigation--container">
			<img src={logo} alt='User logo' className='navigation--logo' />
		</div>
	)
}

export default Navigation