import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import App from './App';

import reportWebVitals from './reportWebVitals';

import { CoursesProvider } from './helpers/context/courses.context';
import { AuthorsProvider } from './helpers/context/authors.context';
import { DisplayProvider } from './helpers/context/display.context';
import { CreateCourseProvider } from './helpers/context/createCourse.contex';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<DisplayProvider>
			<CoursesProvider>
				<AuthorsProvider>
					<CreateCourseProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</CreateCourseProvider>
				</AuthorsProvider>
			</CoursesProvider>
		</DisplayProvider>
	</React.StrictMode>
);

reportWebVitals();
