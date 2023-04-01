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
export type AddNewCourseToList = ActionWithPayload<
	COURSES_ACTION_TYPES.ADD_NEW_COURSE_TO_LIST,
	Course
>;
export type DeleteCourseFromList = ActionWithPayload<
	COURSES_ACTION_TYPES.DELETE_COURSE_FROM_LIST,
	string
>;
export type UpdateCourseInList = ActionWithPayload<
	COURSES_ACTION_TYPES.UPDATE_COURSE_IN_LIST,
	Course
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
export const addNewCourseToList = withMatcher(
	(newCourse: Course): AddNewCourseToList =>
		createAction(COURSES_ACTION_TYPES.ADD_NEW_COURSE_TO_LIST, newCourse)
);
export const deleteCourseFromList = withMatcher(
	(idCourseToDelete: string): DeleteCourseFromList =>
		createAction(COURSES_ACTION_TYPES.DELETE_COURSE_FROM_LIST, idCourseToDelete)
);
export const updateCourseInList = withMatcher(
	(updatedCourse: Course): UpdateCourseInList =>
		createAction(COURSES_ACTION_TYPES.UPDATE_COURSE_IN_LIST, updatedCourse)
);
