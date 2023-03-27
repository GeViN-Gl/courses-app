import { CREATE_COURSE_ACTION_TYPES } from './actionTypes';
import { createAction } from '../../helpers/reducer/reducer.utils';

export const setNotAddedAuthorsList = (authorsList) =>
	createAction(
		CREATE_COURSE_ACTION_TYPES.SET_NOT_ADDED_AUTHORS_LIST,
		authorsList
	);
export const setAddedAuthorsList = (authorsList) =>
	createAction(CREATE_COURSE_ACTION_TYPES.SET_ADDED_AUTHORS_LIST, authorsList);
export const setTimeHours = (timeHours) =>
	createAction(CREATE_COURSE_ACTION_TYPES.SET_TIME_HOURS, timeHours);
export const setTimeMinutes = (timeMinutes) =>
	createAction(CREATE_COURSE_ACTION_TYPES.SET_TIME_MINUTES, timeMinutes);
export const setCourseTitle = (courseTitle) =>
	createAction(CREATE_COURSE_ACTION_TYPES.SET_COURSE_TITLE, courseTitle);
export const setCourseDescription = (courseDescription) =>
	createAction(
		CREATE_COURSE_ACTION_TYPES.SET_COURSE_DESCRIPTION,
		courseDescription
	);
