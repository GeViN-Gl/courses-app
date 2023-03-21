import { HeaderContainer, ElementContainer } from './Header.styles';

import { useEffect, Fragment } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button, { BUTTON_TYPES_CLASSES } from '../../common/Button/Button';

const Header = () => {
	const navigate = useNavigate();
	useEffect(
		() => {
			const isLoggedIn = false;
			if (!isLoggedIn) {
				navigate('/login');
			}
		},
		// currently only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<Fragment>
			<HeaderContainer>
				<Logo />
				<ElementContainer>
					<div className='name'>Dave</div>
					<Button buttonType={BUTTON_TYPES_CLASSES.base}>Logout</Button>
				</ElementContainer>
			</HeaderContainer>
			<Link to='courses'>courses </Link>
			<Link to='registration'>registration </Link>
			<Link to='login'>login </Link>
			<Link to='create'>CreateCourse </Link>
			<Outlet />
		</Fragment>
	);
};

export default Header;
