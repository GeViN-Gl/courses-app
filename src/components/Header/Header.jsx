import {
	HeaderContainer,
	ElementContainer,
	LogoContainer,
	Name,
} from './Header.styles';

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
				navigate('/courses');
			}
		},
		// currently only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	return (
		<Fragment>
			<HeaderContainer>
				<LogoContainer to='/'>
					<Logo />
				</LogoContainer>
				<ElementContainer>
					<Name>dave</Name>
					<Button buttonType={BUTTON_TYPES_CLASSES.base}>Logout</Button>
				</ElementContainer>
			</HeaderContainer>
			<Link to='courses'>courses </Link>
			<Link to='registration'>registration </Link>
			<Link to='login'>login </Link>
			<Link to='create'>CreateCourse </Link>
			<Link to='cinfo'>Cinfo </Link>
			<Outlet />
		</Fragment>
	);
};

export default Header;
