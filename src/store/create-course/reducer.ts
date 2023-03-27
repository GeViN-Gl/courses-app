import { mockedAuthorsList } from '../../constants';
import { AnyAction } from 'redux';

import { Author } from '../authors/reducer';
import {
	setAddedAuthorsList,
	setCourseDescription,
	setCourseTitle,
	setNotAddedAuthorsList,
	setTimeHours,
	setTimeMinutes,
} from './actionCreators';

export type createCourseState = {
	notAddedAuthorsList: Author[];
	addedAuthorsList: Author[];
	timeHours: string;
	timeMinutes: number;
	courseTitle: string;
	courseDescription: string;
};

const INITIAL_STATE: createCourseState = {
	notAddedAuthorsList: mockedAuthorsList,
	addedAuthorsList: [],
	timeHours: '00:00',
	timeMinutes: 0,
	courseTitle: '',
	courseDescription: '',
};

export const createCourseReducer = (
	state = INITIAL_STATE,
	action: AnyAction
) => {
	if (setNotAddedAuthorsList.match(action)) {
		return { ...state, notAddedAuthorsList: action.payload };
	}
	if (setAddedAuthorsList.match(action)) {
		return { ...state, addedAuthorsList: action.payload };
	}
	if (setTimeHours.match(action)) {
		return { ...state, timeHours: action.payload };
	}
	if (setTimeMinutes.match(action)) {
		return { ...state, timeMinutes: action.payload };
	}
	if (setCourseTitle.match(action)) {
		return { ...state, courseTitle: action.payload };
	}
	if (setCourseDescription.match(action)) {
		return { ...state, courseDescription: action.payload };
	}

	return state;
};
