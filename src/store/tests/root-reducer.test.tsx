import { Course, CourseState, coursesReducer } from '../courses/reducer';

import fetchMock from 'jest-fetch-mock';
import { createAction } from '../../helpers/reducer/reducer.utils';
import { COURSES_ACTION_TYPES } from '../courses/actionTypes';
import { mockedState } from '../../constants';

import { getAllCoursesFromAPI } from '../../servises';
import { fetchCoursesSuccess } from '../courses/actionCreators';
import { mockStore } from './mockStore';

describe('Course reducer', () => {
	fetchMock.enableMocks();

	beforeEach((): void => {
		fetchMock.resetMocks();
	});

	it('should return the initial state', () => {
		expect(coursesReducer(undefined, { type: undefined })).toEqual({
			coursesList: [],
			filterField: '',
			isLoading: false,
			error: null,
		});
	});

	it('should add new course to the list', () => {
		const previousState: CourseState = {
			coursesList: [],
			filterField: '',
			isLoading: false,
			error: null,
		};
		const newCourse: Course = {
			id: '2',
			title: 'title 2',
			description: 'description 2',
			creationDate: '3/4/5678',
			duration: 24,
			authors: ['id2'],
		};
		const newAction = createAction(
			COURSES_ACTION_TYPES.ADD_NEW_COURSE_TO_LIST,
			newCourse
		);
		const expectedState: CourseState = {
			coursesList: [
				{
					id: '2',
					title: 'title 2',
					description: 'description 2',
					creationDate: '3/4/5678',
					duration: 24,
					authors: ['id2'],
				},
			],
			filterField: '',
			isLoading: false,
			error: null,
		};
		expect(coursesReducer(previousState, newAction)).toEqual(expectedState);
	});

	it('should handle GET_COURSES and returns new state', async () => {
		// store without courses
		const store = mockStore({ ...mockedState, courses: { coursesList: [] } });
		const expectedCoursesList = mockedState.courses.coursesList;
		expect(store.getState().courses.coursesList.length).toEqual(0);
		expect(expectedCoursesList.length).toEqual(2);

		fetchMock.mockResponseOnce(
			JSON.stringify({
				successful: true,
				result: expectedCoursesList,
			})
		);
		const data = await getAllCoursesFromAPI();
		expect(data.successful).toEqual(true);
		store.dispatch(fetchCoursesSuccess(data.result));

		expect(store.getState().courses.coursesList.length).toEqual(2);
	});
});
