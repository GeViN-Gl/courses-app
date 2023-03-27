import { RootState } from '../store';

export const selectCoursesList = (state: RootState) =>
	state.courses.coursesList;
export const selectFilterField = (state: RootState) =>
	state.courses.filterField;
