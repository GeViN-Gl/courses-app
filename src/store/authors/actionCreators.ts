import { AUTHORS_ACTION_TYPES } from './actionTypes';
import {
	createAction,
	withMatcher,
	ActionWithPayload,
	Action,
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
// Action types using Thunk
export type FetchAuthorsStart =
	Action<AUTHORS_ACTION_TYPES.FETCH_AUTHORS_START>;
export type FetchAuthorsSuccess = ActionWithPayload<
	AUTHORS_ACTION_TYPES.FETCH_AUTHORS_SUCCESS,
	Author[]
>;
export type FetchAuthorsFailure = ActionWithPayload<
	AUTHORS_ACTION_TYPES.FETCH_AUTHORS_FAILURE,
	Error
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

// Action Thunks
export const fetchAuthorsStart = withMatcher(
	(): FetchAuthorsStart =>
		createAction(AUTHORS_ACTION_TYPES.FETCH_AUTHORS_START)
);
export const fetchAuthorsSuccess = withMatcher(
	(authorsList: Author[]): FetchAuthorsSuccess =>
		createAction(AUTHORS_ACTION_TYPES.FETCH_AUTHORS_SUCCESS, authorsList)
);
export const fetchAuthorsFailure = withMatcher(
	(error: Error): FetchAuthorsFailure =>
		createAction(AUTHORS_ACTION_TYPES.FETCH_AUTHORS_FAILURE, error)
);
