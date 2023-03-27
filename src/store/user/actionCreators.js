import { USER_ACTION_TYPES } from './actionTypes';
import { createAction } from '../../helpers/reducer/reducer.utils';

export const setCurrentUserIsAuth = (userIsAuth) =>
	createAction(USER_ACTION_TYPES.SET_CURREN_USER_IS_AUTH, userIsAuth);
export const setCurrentUserName = (userName) =>
	createAction(USER_ACTION_TYPES.SET_CURRENT_USER_NAME, userName);
export const setCurrentUserEmail = (userEmail) =>
	createAction(USER_ACTION_TYPES.SET_CURRENT_USER_EMAIL, userEmail);
export const setCurrentUserToken = (userToken) =>
	createAction(USER_ACTION_TYPES.SET_CURRENT_USER_TOKEN, userToken);
