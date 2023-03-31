import { mockedCoursesList } from '../../constants';
import { AnyAction } from 'redux';
import { setCoursesList, setFilterField } from './actionCreators';

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
};

const INITIAL_STATE: CourseState = {
	coursesList: mockedCoursesList,
	filterField: '',
};
//TODO migrate mockedCoursesList in task 3
// and mb don`t create List as in authors

export const coursesReducer = (state = INITIAL_STATE, action: AnyAction) => {
	if (setCoursesList.match(action)) {
		return { ...state, coursesList: action.payload };
	}
	if (setFilterField.match(action)) {
		return { ...state, filterField: action.payload };
	}
	return state;
};

/*

courses: [], // list of courses. Default value - empty array. After
success getting courses - value from API /courses/all response. See Swagger.

Save new course.
Delete course.
Update course.
Get courses. Save courses to store after getting them from API. See Swagger /courses/all.
*/
