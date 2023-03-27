import { AUTHORS_ACTION_TYPES } from './actionTypes';
import { mockedAuthorsList } from '../../constants';
const INITIAL_STATE = {
	authorsList: mockedAuthorsList,
};
//TODO migrate mockedAuthorsList in task 3
// and mb don`t create authorsList in authors, and directly hold array in slice

export const authorsReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case AUTHORS_ACTION_TYPES.SET_AUTHORS_LIST:
			return { ...state, authorsList: payload };
		default:
			return state;
	}
};

/*

authors: [] // list of authors. Default value - empty array. After
success getting authors - value from API /authors/all response. See Swagger.

*/
