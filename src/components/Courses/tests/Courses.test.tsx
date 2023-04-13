import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { mockStore } from '../../../store/tests/mockStore';
import { mockedState } from '../../../constants';

import Courses from '../Courses';
// import { getStringWithAuthorsNames } from '../../../helpers/customArrayFuncs';

jest.mock('../../../helpers/customArrayFuncs', () => ({
	getStringWithAuthorsNames: jest.fn(() => 'mocked author names'),
}));

describe('Courses', () => {
	it('should renders correctly', () => {
		const store = mockStore(mockedState);
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);
	});

	it('should display amount of CourseCard equal length of courses array', () => {
		const store = mockStore(mockedState);
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getAllByTestId('course-card-element').length).toEqual(
			mockedState.courses.coursesList.length
		);
	});
	//should display amount of CourseCard equal length of courses array

	it('should display Empty container if courses array length is 0', () => {
		const noCoursesState = { ...mockedState, courses: { coursesList: [] } };
		const store = mockStore(noCoursesState);
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);
		expect(screen.queryAllByTestId('course-card-element').length).toEqual(0);
	});

	it('should be showed after a click on a button "Add new course"', async () => {
		const store = mockStore(mockedState);
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Courses />
				</BrowserRouter>
			</Provider>
		);
		expect(screen.getByText('Add new course')).toBeInTheDocument();
		fireEvent.click(screen.getByText('Add new course'));
		expect(window.location.pathname).toEqual('/courses/add');
	});
});

//
