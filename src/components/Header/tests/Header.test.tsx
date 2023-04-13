import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { mockStore } from '../../../store/tests/mockStore';
import { mockedState } from '../../../constants';

import Header from '../Header';

describe('Header', () => {
	it('renders correctly', async () => {
		const store = mockStore(mockedState);
		render(
			<Provider store={store}>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByTestId('logo-element')).toBeInTheDocument();
		expect(screen.getByText('Test Name')).toBeInTheDocument();
		expect(false).toBeTruthy();
	});
});
