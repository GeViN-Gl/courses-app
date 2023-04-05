import { AnyAction } from 'redux';
import {
	clearCurrentUser,
	setCurrentUserEmail,
	setCurrentUserIsAuth,
	setCurrentUserName,
	setCurrentUserToken,
	setCurrentUserRole,
	fetchUserStart,
	fetchUserSuccess,
	fetchUserFailure,
} from './actionCreators';

export type User = {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
	role: string;
};

export type UserState = {
	readonly isAuth: boolean;
	readonly name: string;
	readonly email: string;
	readonly token: string;
	readonly role: string;
};

const INITIAL_STATE: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const userReducer = (state = INITIAL_STATE, action: AnyAction) => {
	if (setCurrentUserIsAuth.match(action)) {
		return { ...state, isAuth: action.payload };
	}
	if (setCurrentUserName.match(action)) {
		return { ...state, name: action.payload };
	}
	if (setCurrentUserEmail.match(action)) {
		return { ...state, email: action.payload };
	}
	if (setCurrentUserToken.match(action)) {
		return { ...state, token: action.payload };
	}
	if (setCurrentUserRole.match(action)) {
		return { ...state, role: action.payload };
	}
	if (fetchUserStart.match(action)) {
		return { ...state, isLoading: true };
	}
	if (fetchUserSuccess.match(action)) {
		const { name, email, token, role } = action.payload;
		return {
			...state,
			isLoading: false,
			isAuth: true,
			name,
			email,
			token,
			role,
		};
	}
	if (fetchUserFailure.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}
	if (clearCurrentUser.match(action)) {
		return { ...state, isAuth: false, name: '', email: '', token: '' };
	}
	return state;
};
