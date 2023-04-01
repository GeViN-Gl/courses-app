import { AnyAction } from 'redux';
import { setAuthorsList, addAuthorToList } from './actionCreators';

export type Author = {
	id: string;
	name: string;
};
export type AuthorsState = {
	authorsList: Author[];
};

const INITIAL_STATE: AuthorsState = {
	authorsList: [],
};
//TODO migrate mockedAuthorsList in task 3
// and mb don`t create authorsList in authors, and directly hold array in slice

export const authorsReducer = (state = INITIAL_STATE, action: AnyAction) => {
	if (setAuthorsList.match(action)) {
		return { ...state, authorsList: action.payload };
	}
	if (addAuthorToList.match(action)) {
		return { ...state, authorsList: [...state.authorsList, action.payload] };
	}

	return state;
};
