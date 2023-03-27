import { CREATE_COURSE_ACTION_TYPES } from './actionTypes';
import {
	ActionWithPayload,
	createAction,
	withMatcher,
} from '../../helpers/reducer/reducer.utils';
import { Author } from '../authors/reducer';

// Action types
export type SetNotAddedAuthorsList = ActionWithPayload<
	CREATE_COURSE_ACTION_TYPES.SET_NOT_ADDED_AUTHORS_LIST,
	Author[]
>;
export type SetAddedAuthorsList = ActionWithPayload<
	CREATE_COURSE_ACTION_TYPES.SET_ADDED_AUTHORS_LIST,
	Author[]
>;
export type SetTimeHours = ActionWithPayload<
	CREATE_COURSE_ACTION_TYPES.SET_TIME_HOURS,
	string
>;
export type SetTimeMinutes = ActionWithPayload<
	CREATE_COURSE_ACTION_TYPES.SET_TIME_MINUTES,
	number
>;
export type SetCourseTitle = ActionWithPayload<
	CREATE_COURSE_ACTION_TYPES.SET_COURSE_TITLE,
	string
>;
export type SetCourseDescription = ActionWithPayload<
	CREATE_COURSE_ACTION_TYPES.SET_COURSE_DESCRIPTION,
	string
>;

// Action Creators with withMacther
export const setNotAddedAuthorsList = withMatcher(
	(authorsList: Author[]): SetNotAddedAuthorsList =>
		createAction(
			CREATE_COURSE_ACTION_TYPES.SET_NOT_ADDED_AUTHORS_LIST,
			authorsList
		)
);
export const setAddedAuthorsList = withMatcher(
	(authorsList: Author[]): SetAddedAuthorsList =>
		createAction(CREATE_COURSE_ACTION_TYPES.SET_ADDED_AUTHORS_LIST, authorsList)
);
export const setTimeHours = withMatcher(
	(timeHours: string): SetTimeHours =>
		createAction(CREATE_COURSE_ACTION_TYPES.SET_TIME_HOURS, timeHours)
);
export const setTimeMinutes = withMatcher(
	(timeMinutes: number): SetTimeMinutes =>
		createAction(CREATE_COURSE_ACTION_TYPES.SET_TIME_MINUTES, timeMinutes)
);
export const setCourseTitle = withMatcher(
	(courseTitle: string): SetCourseTitle =>
		createAction(CREATE_COURSE_ACTION_TYPES.SET_COURSE_TITLE, courseTitle)
);
export const setCourseDescription = withMatcher(
	(courseDescription: string): SetCourseDescription =>
		createAction(
			CREATE_COURSE_ACTION_TYPES.SET_COURSE_DESCRIPTION,
			courseDescription
		)
);
