import {
	HeaderContainer,
	ElementContainer,
	LogoLinkContainer,
	Name,
} from './Header.styles';

import { useState, useEffect, MouseEvent } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button, { BUTTON_TYPES_CLASSES } from '../../common/Button/Button';

import { useSelector, useDispatch } from 'react-redux';
import {
	selectCurrentUserName,
	selectCurrentUserToken,
} from '../../store/user/selectors';
import {
	setCurrentUserName,
	setCurrentUserToken,
} from '../../store/user/actionCreators';

const Header = () => {
	const navigate = useNavigate();

	const [onAuthPages, setOnAuthPages] = useState(false);

	const userName = useSelector(selectCurrentUserName);
	const userToken = useSelector(selectCurrentUserToken);
	const dispatch = useDispatch();

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
	type LocalToken = string | null;

	useEffect(() => {
		const localToken: LocalToken = localStorage.getItem('userToken');
		const isLocalTokenExist = (localToken: LocalToken): localToken is string =>
			localToken !== null;
		if (isLocalTokenExist(localToken)) {
			dispatch(setCurrentUserToken(localToken));
		}
	}, [dispatch]); // TOASK dispatch will not change ever

	useEffect(() => {
		if (localStorage.getItem('userToken')) {
			navigate('/courses');
		} else {
			navigate('/login');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userToken]);

	const logInOutButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		// When user clicks on Logout button, App should navigate to /login
		// and you should remove token from localStorage.
		if (!!userName) {
			// LogOUT displays only if user obj exists
			localStorage.removeItem('userToken');
			dispatch(setCurrentUserName(''));
			dispatch(setCurrentUserToken(''));
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
					{!onAuthPages && <Name>{userName}</Name>}
					{!onAuthPages && (
						<Button
							buttonType={BUTTON_TYPES_CLASSES.base}
							// eslint-disable-next-line prettier/prettier
							onClick={logInOutButtonHandler}>
							{userName ? 'Logout' : 'Login'}
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
