import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import App from './App';

import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { CoursesProvider } from './helpers/context/courses.context';

import { CreateCourseProvider } from './helpers/context/createCourse.contex';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<CoursesProvider>
				<CreateCourseProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</CreateCourseProvider>
			</CoursesProvider>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
