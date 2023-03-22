import {
	HeaderContainer,
	ElementContainer,
	LogoLinkContainer,
	Name,
} from './Header.styles';

import { useState, useEffect, Fragment, useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button, { BUTTON_TYPES_CLASSES } from '../../common/Button/Button';

import { UserContext } from '../../helpers/context/user.context';

const Header = () => {
	const navigate = useNavigate();
	const userToken = localStorage.getItem('userToken');

	const [onAuthPages, setOnAuthPages] = useState(false);

	const { user, setUser, setUserToken } = useContext(UserContext);

	const currentLocation = useLocation(); //Where am i?
	// useCallback(() => {
	// 	setLocation(currentLocation);
	// }, [currentLocation]);

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

	useEffect(
		() => {
			if (userToken) {
				navigate('/courses');
			} else {
				navigate('/login');
			}
		},
		// currently only on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const logInOutButtonHandler = (e) => {
		// When user clicks on Logout button, App should navigate to /login
		// and you should remove token from localStorage.
		if (!!user) {
			// LogOUT displays only if user obj exists
			localStorage.removeItem('userToken');
			setUser(null);
			setUserToken(null);
			navigate('/login');
		} else {
			//userToken exists in localStorage but user is not logged
			navigate('/login');
		}
	};

	return (
		<Fragment>
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
		</Fragment>
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
