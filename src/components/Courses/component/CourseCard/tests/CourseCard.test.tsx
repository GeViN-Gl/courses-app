import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { mockStore } from '../../../../../store/tests/mockStore';
import { mockedState } from '../../../../../constants';

import CourseCard from '../CourseCard';
import { getStringWithAuthorsNames } from '../../../../../helpers/customArrayFuncs';

jest.mock('../../../../../helpers/customArrayFuncs', () => ({
	getStringWithAuthorsNames: jest.fn(() => 'mocked author names'),
}));

describe('CourseCard', () => {
	beforeEach(() => {
		const store = mockStore(mockedState);
		const course = mockedState.courses.coursesList[0];
		render(
			<Provider store={store}>
				<BrowserRouter>
					<CourseCard course={course} />
				</BrowserRouter>
			</Provider>
		);
	});

	it('should display title', () => {
		expect(screen.getByText('title 1')).toBeInTheDocument();
	});
	it('should display description', () => {
		expect(screen.getByText('description 1')).toBeInTheDocument();
	});
	it('should display duration in the correct format', () => {
		expect(screen.getByText('00:42')).toBeInTheDocument();
	});
	it('should display authors list', () => {
		expect(getStringWithAuthorsNames).toHaveBeenCalled();
	});
	it('should display created date in the correct format', () => {
		expect(screen.getByText('1/2/3456')).toBeInTheDocument();
	});
});
