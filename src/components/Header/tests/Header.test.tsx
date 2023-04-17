import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { mockStore } from '../../../store/tests/mockStore';
import { mockedState } from '../../../constants';

import Header from '../Header';

describe('Header', () => {
	beforeEach(() => {
		const store = mockStore(mockedState);
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);
	});
	it('should have logo', async () => {
		expect(screen.getByTestId('logo-element')).toBeInTheDocument();
	});
	it('should have user`s name', async () => {
		expect(screen.getByText('Test Name')).toBeInTheDocument();
	});
});
