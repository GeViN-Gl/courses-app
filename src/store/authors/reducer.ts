import { mockedAuthorsList } from '../../constants';
import { AnyAction } from 'redux';
import { setAuthorsList } from './actionCreators';

export type Author = {
	id: string;
	name: string;
};
export type AuthorsState = {
	authorsList: Author[];
};

const INITIAL_STATE: AuthorsState = {
	authorsList: mockedAuthorsList,
};
//TODO migrate mockedAuthorsList in task 3
// and mb don`t create authorsList in authors, and directly hold array in slice

export const authorsReducer = (state = INITIAL_STATE, action: AnyAction) => {
	if (setAuthorsList.match(action)) {
		return { ...state, authorsList: action.payload };
	}

	return state;
};

/*

authors: [] // list of authors. Default value - empty array. After
success getting authors - value from API /authors/all response. See Swagger.

*/
