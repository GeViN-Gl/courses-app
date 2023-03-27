import { CREATE_COURSE_ACTION_TYPES } from './actionTypes';
import { mockedAuthorsList } from '../../constants';

const INITIAL_STATE = {
	notAddedAuthorsList: mockedAuthorsList,
	addedAuthorsList: [],
	timeHours: '00:00',
	timeMinutes: 0,
	courseTitle: '',
	courseDescription: '',
};

export const createCourseReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case CREATE_COURSE_ACTION_TYPES.SET_NOT_ADDED_AUTHORS_LIST:
			return { ...state, notAddedAuthorsList: payload };
		case CREATE_COURSE_ACTION_TYPES.SET_ADDED_AUTHORS_LIST:
			return { ...state, addedAuthorsList: payload };
		case CREATE_COURSE_ACTION_TYPES.SET_TIME_HOURS:
			return { ...state, timeHours: payload };
		case CREATE_COURSE_ACTION_TYPES.SET_TIME_MINUTES:
			return { ...state, timeMinutes: payload };
		case CREATE_COURSE_ACTION_TYPES.SET_COURSE_TITLE:
			return { ...state, courseTitle: payload };
		case CREATE_COURSE_ACTION_TYPES.SET_COURSE_DESCRIPTION:
			return { ...state, courseDescription: payload };

		default:
			return state;
	}
};
