import { USER_ACTION_TYPES } from './actionTypes';

const INITIAL_STATE = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURREN_USER_IS_AUTH:
			return { ...state, isAuth: payload };
		case USER_ACTION_TYPES.SET_CURRENT_USER_NAME:
			return { ...state, name: payload };
		case USER_ACTION_TYPES.SET_CURRENT_USER_EMAIL:
			return { ...state, email: payload };
		case USER_ACTION_TYPES.SET_CURRENT_USER_TOKEN:
			return { ...state, token: payload };
		default:
			return state;
	}
};

/*
user: {
isAuth: boolean, // default value - false. After success login -true
name: string, // default value - empty string. After success login - name of user
email: string, // default value - empty string. After success login - email of user
token: string, // default value - empty string or token value from localStorage. After success login - value from API /login response. See Swagger.
},


*/
