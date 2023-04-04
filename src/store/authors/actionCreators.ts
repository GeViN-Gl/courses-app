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
export type AddAuthorToList = ActionWithPayload<
	AUTHORS_ACTION_TYPES.ADD_AUTHOR_TO_LIST,
	Author
>;

// Action Creators with withMacther
export const setAuthorsList = withMatcher(
	(authorsList: Author[]): SetAuthorsList =>
		createAction(AUTHORS_ACTION_TYPES.SET_AUTHORS_LIST, authorsList)
);

export const addAuthorToList = withMatcher(
	(authorToAdd: Author): AddAuthorToList =>
		createAction(AUTHORS_ACTION_TYPES.ADD_AUTHOR_TO_LIST, authorToAdd)
);
