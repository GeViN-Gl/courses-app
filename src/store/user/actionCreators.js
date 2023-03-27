import { USER_ACTION_TYPES } from './actionTypes';
import { createAction } from '../../helpers/reducer/reducer.utils';

export const setCurrentUser = (user) =>
	createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
