import { RootState } from '../store';

export const selectNotAddedAuthorsList = (state: RootState) =>
	state.createCourse.notAddedAuthorsList;
export const selectAddedAuthorsList = (state: RootState) =>
	state.createCourse.addedAuthorsList;
export const selectTimeHours = (state: RootState) =>
	state.createCourse.timeHours;
export const selectTimeMinutes = (state: RootState) =>
	state.createCourse.timeMinutes;
export const selectCourseTitle = (state: RootState) =>
	state.createCourse.courseTitle;
export const selectCourseDescription = (state: RootState) =>
	state.createCourse.courseDescription;
