import { USER_ACTION_TYPES } from './actionTypes';
import {
	createAction,
	withMatcher,
	ActionWithPayload,
	Action,
} from '../../helpers/reducer/reducer.utils';
import { User } from './reducer';

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
export type SetCurrentUserRole = ActionWithPayload<
	USER_ACTION_TYPES.SET_CURRENT_USER_ROLE,
	string
>;
export type FetchUserStart = Action<USER_ACTION_TYPES.FETCH_USER_START>;
export type FetchUserSuccess = ActionWithPayload<
	USER_ACTION_TYPES.FETCH_USER_SUCCESS,
	User
>;
export type FetchUserFailure = ActionWithPayload<
	USER_ACTION_TYPES.FETCH_USER_FAILURE,
	Error
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
export const setCurrentUserRole = withMatcher(
	(userRole: string): SetCurrentUserRole =>
		createAction(USER_ACTION_TYPES.SET_CURRENT_USER_ROLE, userRole)
);
export const fetchUserStart = withMatcher(
	(): FetchUserStart => createAction(USER_ACTION_TYPES.FETCH_USER_START)
);
export const fetchUserSuccess = withMatcher(
	(user: User): FetchUserSuccess =>
		createAction(USER_ACTION_TYPES.FETCH_USER_SUCCESS, user)
);
export const fetchUserFailure = withMatcher(
	(error: Error): FetchUserFailure =>
		createAction(USER_ACTION_TYPES.FETCH_USER_FAILURE, error)
);
export const clearCurrentUser = withMatcher(
	(): ClearCurrentUser => createAction(USER_ACTION_TYPES.CLEAR_CURRENT_USER)
);
