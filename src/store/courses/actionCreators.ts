import { COURSES_ACTION_TYPES } from './actionTypes';
import {
	createAction,
	ActionWithPayload,
	withMatcher,
} from '../../helpers/reducer/reducer.utils';

import { Course } from './reducer';

// Action types
export type SetCoursesList = ActionWithPayload<
	COURSES_ACTION_TYPES.SET_COURSES_LIST,
	Course[]
>;
export type SetFilterField = ActionWithPayload<
	COURSES_ACTION_TYPES.SET_FILTER_FIELD,
	string
>;

// Action Creators with withMacther
export const setCoursesList = withMatcher(
	(coursesList: Course[]): SetCoursesList =>
		createAction(COURSES_ACTION_TYPES.SET_COURSES_LIST, coursesList)
);
export const setFilterField = withMatcher(
	(filterField: string): SetFilterField =>
		createAction(COURSES_ACTION_TYPES.SET_FILTER_FIELD, filterField)
);
