import { COURSES_ACTION_TYPES } from './actionTypes';
import { createAction } from '../../helpers/reducer/reducer.utils';

export const setCoursesList = (coursesList) =>
	createAction(COURSES_ACTION_TYPES.SET_COURSES_LIST, coursesList);
export const setFilterField = (filterField) =>
	createAction(COURSES_ACTION_TYPES.SET_FILTER_FIELD, filterField);
