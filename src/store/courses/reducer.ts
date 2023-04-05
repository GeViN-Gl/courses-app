import { AnyAction } from 'redux';
import {
	setFilterField,
	setCoursesList,
	addNewCourseToList,
	deleteCourseFromList,
	updateCourseInList,
	fetchCoursesStart,
	fetchCoursesSuccess,
	fetchCoursesFailure,
} from './actionCreators';

export type Course = {
	id: string;
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
};

export type CourseState = {
	readonly coursesList: Course[];
	readonly filterField: string;
	readonly isLoading: boolean;
	readonly error: Error | null;
};

const INITIAL_STATE: CourseState = {
	coursesList: [],
	filterField: '',
	isLoading: false,
	error: null,
};

export const coursesReducer = (state = INITIAL_STATE, action: AnyAction) => {
	if (setFilterField.match(action)) {
		return { ...state, filterField: action.payload };
	}
	if (setCoursesList.match(action)) {
		return { ...state, coursesList: action.payload };
	}
	if (addNewCourseToList.match(action)) {
		return { ...state, coursesList: [...state.coursesList, action.payload] };
	}
	if (deleteCourseFromList.match(action)) {
		return {
			...state,
			coursesList: state.coursesList.filter(
				(course) => course.id !== action.payload
			),
		};
	}
	if (updateCourseInList.match(action)) {
		const idx: number = state.coursesList.findIndex(
			(course) => course.id === action.payload.id
		);
		const newCoursesList = state.coursesList;
		// if course with such id doesn`t exist - return state
		if (idx === -1) {
			return state;
		}
		newCoursesList[idx] = action.payload;
		return {
			...state,
			coursesList: newCoursesList,
		};
	}
	// thunk actions
	if (fetchCoursesStart.match(action)) {
		return { ...state, isLoading: true };
	}
	if (fetchCoursesSuccess.match(action)) {
		return { ...state, isLoading: false, coursesList: action.payload };
	}
	if (fetchCoursesFailure.match(action)) {
		return { ...state, isLoading: false, error: action.payload };
	}
	return state;
};
