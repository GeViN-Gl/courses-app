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
import { logoutUserFromAPI } from '../../servises';
import { toastNotify } from '../../helpers/toastNotify';

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

	// On first render, App should check if token exists in localStorage.
	// If token exists, App should set it to the store.
	type LocalToken = string | null;
	useEffect(() => {
		const localToken: LocalToken = localStorage.getItem('userToken');
		const isLocalTokenExist = (localToken: LocalToken): localToken is string =>
			localToken !== null;
		if (isLocalTokenExist(localToken)) {
			dispatch(setCurrentUserToken(localToken));
		}
	}, [dispatch]);

	// If token exists, App should navigate to /courses.
	// If token doesn't exist, App should navigate to /login.
	// TODO: there is must be some logic to pull user credentials from server
	// TODO: userToken from selector may cause unexpected rerendering, need to check
	useEffect(() => {
		if (localStorage.getItem('userToken')) {
			navigate('/courses');
		} else {
			navigate('/login');
		}
		// i dont need navigate in dependency
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userToken]);

	const logoutHandler = async (): Promise<void> => {
		// first check is user logged in
		if (!isUserAuth) {
			return;
		}
		// if user logged in, then logout
		console.log('userToken: HEADER', userToken);
		const { successful } = await logoutUserFromAPI(userToken);
		if (successful) {
			localStorage.removeItem('userToken');
			dispatch(clearCurrentUser());
			toastNotify('👋 You are logged out');
		} else {
			toastNotify('🛑 Something went wrong');
		}
	};

	const logInOutButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		// When user clicks on Logout button, App should navigate to /login
		// and you should remove token from localStorage.
		// TODO: i need to migrate this behavior to redux-thunk
		if (isUserAuth) {
			// LogOUT displays only if user obj exists
			logoutHandler();
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
							{isUserAuth ? 'Logout' : 'Login'}
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
