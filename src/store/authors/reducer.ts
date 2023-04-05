import { AnyAction } from 'redux';
import {
	setAuthorsList,
	addAuthorToList,
	fetchAuthorsStart,
	fetchAuthorsSuccess,
	fetchAuthorsFailure,
} from './actionCreators';

export type Author = {
	id: string;
	name: string;
};
export type AuthorsState = {
	readonly authorsList: Author[];
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const INITIAL_STATE: AuthorsState = {
	authorsList: [],
	isLoading: false,
	error: null,
};

export const authorsReducer = (state = INITIAL_STATE, action: AnyAction) => {
	if (setAuthorsList.match(action)) {
		return { ...state, authorsList: action.payload };
	}
	if (addAuthorToList.match(action)) {
		return { ...state, authorsList: [...state.authorsList, action.payload] };
	}
	// thunk actions
	if (fetchAuthorsStart.match(action)) {
		return { ...state, isLoading: true };
	}
	if (fetchAuthorsSuccess.match(action)) {
		return { ...state, isLoading: false, authorsList: action.payload };
	}
	if (fetchAuthorsFailure.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}
	return state;
};
