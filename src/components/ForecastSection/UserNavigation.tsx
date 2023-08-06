import logo from '../../assets/penguin.svg'
import './index.css'

const UserNavigation = () => {
	return (
		<div className="navigation">
			<img alt='User logo' className='navigation__logo' loading='lazy' src={logo} />
		</div>
	)
}

export default UserNavigation