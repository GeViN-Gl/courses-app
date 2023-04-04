import {
	HeaderContainer,
	ElementContainer,
	LogoLinkContainer,
	Name,
} from './Header.styles';

import { useState, useEffect, MouseEvent, FC } from 'react';
import {
	Outlet,
	useNavigate,
	useLocation,
	NavigateFunction,
} from 'react-router-dom';

import Logo from './components/Logo/Logo';
import Button, { BUTTON_TYPES_CLASSES } from '../../common/Button/Button';

import { useSelector, useDispatch } from 'react-redux';
import {
	selectCurrentUserIsAuth,
	selectCurrentUserName,
	selectCurrentUserToken,
} from '../../store/user/selectors';
import {
	clearCurrentUser,
	setCurrentUserToken,
} from '../../store/user/actionCreators';
import { AnyAction, Dispatch } from 'redux';

const Header: FC = () => {
	const navigate: NavigateFunction = useNavigate();

	const [onAuthPages, setOnAuthPages] = useState(false);

	const isUserAuth = useSelector(selectCurrentUserIsAuth);
	const userName = useSelector(selectCurrentUserName);
	const userToken = useSelector(selectCurrentUserToken);
	const dispatch: Dispatch<AnyAction> = useDispatch();

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
	}, [dispatch]);

	useEffect(() => {
		if (localStorage.getItem('userToken')) {
			navigate('/courses');
		} else {
			navigate('/login');
		}
		// i dont need navigate in dependency
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userToken]);

	const logInOutButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		// When user clicks on Logout button, App should navigate to /login
		// and you should remove token from localStorage.
		if (isUserAuth) {
			// LogOUT displays only if user obj exists
			localStorage.removeItem('userToken');
			dispatch(clearCurrentUser());
		} else {
			// userToken exists in localStorage but user is not logged
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
							// ASK strange prettier bechavior, have an Insert `⏎↹↹↹↹↹↹` error :(
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
