import {
	HeaderContainer,
	ElementContainer,
	LogoLinkContainer,
	Name,
} from './Header.styles';

import { useState, useEffect, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button, { BUTTON_TYPES_CLASSES } from '../../common/Button/Button';

import { UserContext } from '../../helpers/context/user.context';

const Header = () => {
	const navigate = useNavigate();

	const [onAuthPages, setOnAuthPages] = useState(false);

	const { user, setUser, userToken, setUserToken } = useContext(UserContext);

	const currentLocation = useLocation(); //Where am i?
	useEffect(() => {
		if (
			currentLocation.pathname.includes('login') ||
			currentLocation.pathname.includes('registration')
		) {
			setOnAuthPages(true);
		} else {
			setOnAuthPages(false);
		}
	}, [currentLocation]);

	// on first mount check if there is any stored token
	useEffect(() => {
		if (localStorage.getItem('userToken')) {
			setUserToken(localStorage.getItem('userToken'));
		}
	}, [setUserToken]);

	useEffect(() => {
		if (localStorage.getItem('userToken')) {
			navigate('/courses');
		} else {
			navigate('/login');
		}
	}, [userToken]);

	const logInOutButtonHandler = (e) => {
		// When user clicks on Logout button, App should navigate to /login
		// and you should remove token from localStorage.
		if (!!user) {
			// LogOUT displays only if user obj exists
			localStorage.removeItem('userToken');
			setUser(null);
			setUserToken(null);
		} else {
			//userToken exists in localStorage but user is not logged
			navigate('/login');
		}
	};

	return (
		<>
			<HeaderContainer>
				<LogoLinkContainer to='/courses'>
					<Logo />
				</LogoLinkContainer>
				<ElementContainer>
					{!onAuthPages && <Name>{user?.name}</Name>}
					{!onAuthPages && (
						<Button
							buttonType={BUTTON_TYPES_CLASSES.base}
							// eslint-disable-next-line prettier/prettier
							onClick={logInOutButtonHandler}>
							{user ? 'Logout' : 'Login'}
						</Button>
					)}
				</ElementContainer>
			</HeaderContainer>

			<Outlet />
		</>
	);
};

export default Header;

/*
testNavBar
			<Link to='courses'>courses </Link>
			<Link to='registration'>registration </Link>
			<Link to='login'>login </Link>
			<Link to='create'>CreateCourse </Link>
			<Link to='cinfo'>Cinfo </Link>
*/
