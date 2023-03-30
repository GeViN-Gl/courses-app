import { AUTHORS_ACTION_TYPES } from './actionTypes';
import {
	createAction,
	withMatcher,
	ActionWithPayload,
} from '../../helpers/reducer/reducer.utils';
import { Author } from './reducer';
// Action types
export type SetAuthorsList = ActionWithPayload<
	AUTHORS_ACTION_TYPES.SET_AUTHORS_LIST,
	Author[]
>;

// Action Creators with withMacther
export const setAuthorsList = withMatcher(
	(authorsList: Author[]): SetAuthorsList =>
		createAction(AUTHORS_ACTION_TYPES.SET_AUTHORS_LIST, authorsList)
);
