import { AUTHORS_ACTION_TYPES } from './actionTypes';
import { createAction } from '../../helpers/reducer/reducer.utils';

export const setAuthorsList = (authorsList) =>
	createAction(AUTHORS_ACTION_TYPES.SET_AUTHORS_LIST, authorsList);
