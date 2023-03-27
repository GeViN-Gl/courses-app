import { COURSES_ACTION_TYPES } from './actionTypes';
import { mockedCoursesList } from '../../constants';

const INITIAL_STATE = {
	coursesList: mockedCoursesList,
	filterField: '',
};
//TODO migrate mockedCoursesList in task 3
// and mb don`t create List as in authors

export const coursesReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case COURSES_ACTION_TYPES.SET_COURSES_LIST:
			return { ...state, coursesList: payload };
		case COURSES_ACTION_TYPES.SET_FILTER_FIELD:
			return { ...state, filterField: payload };
		default:
			return state;
	}
};

/*

courses: [], // list of courses. Default value - empty array. After
success getting courses - value from API /courses/all response. See Swagger.

*/
