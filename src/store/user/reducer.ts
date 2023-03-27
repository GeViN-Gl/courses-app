import { AnyAction } from 'redux';
import {
	setCurrentUserEmail,
	setCurrentUserIsAuth,
	setCurrentUserName,
	setCurrentUserToken,
} from './actionCreators';

export type UserState = {
	readonly isAuth: boolean;
	readonly name: string;
	readonly email: string;
	readonly token: string;
};

const INITIAL_STATE: UserState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
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

	return state;
};

/*
user: {
isAuth: boolean, // default value - false. After success login -true
name: string, // default value - empty string. After success login - name of user
email: string, // default value - empty string. After success login - email of user
token: string, // default value - empty string or token value from localStorage. After success login - value from API /login response. See Swagger.
},


*/
