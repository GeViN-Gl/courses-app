import { USER_ACTION_TYPES } from './actionTypes';
import {
	createAction,
	withMatcher,
	ActionWithPayload,
	Action,
} from '../../helpers/reducer/reducer.utils';

// Action types
export type SetCurrentUserIsAuth = ActionWithPayload<
	USER_ACTION_TYPES.SET_CURRENT_USER_IS_AUTH,
	boolean
>;
export type SetCurrentUserName = ActionWithPayload<
	USER_ACTION_TYPES.SET_CURRENT_USER_NAME,
	string
>;
export type SetCurrentUserEmail = ActionWithPayload<
	USER_ACTION_TYPES.SET_CURRENT_USER_EMAIL,
	string
>;
export type SetCurrentUserToken = ActionWithPayload<
	USER_ACTION_TYPES.SET_CURRENT_USER_TOKEN,
	string
>;
export type ClearCurrentUser = Action<USER_ACTION_TYPES.CLEAR_CURRENT_USER>;

// Action Creators with withMacther
export const setCurrentUserIsAuth = withMatcher(
	(userIsAuth: boolean): SetCurrentUserIsAuth =>
		createAction(USER_ACTION_TYPES.SET_CURRENT_USER_IS_AUTH, userIsAuth)
);
export const setCurrentUserName = withMatcher(
	(userName: string): SetCurrentUserName =>
		createAction(USER_ACTION_TYPES.SET_CURRENT_USER_NAME, userName)
);
export const setCurrentUserEmail = withMatcher(
	(userEmail: string): SetCurrentUserEmail =>
		createAction(USER_ACTION_TYPES.SET_CURRENT_USER_EMAIL, userEmail)
);
export const setCurrentUserToken = withMatcher(
	(userToken: string): SetCurrentUserToken =>
		createAction(USER_ACTION_TYPES.SET_CURRENT_USER_TOKEN, userToken)
);
export const clearCurrentUser = withMatcher(
	(): ClearCurrentUser => createAction(USER_ACTION_TYPES.CLEAR_CURRENT_USER)
);
