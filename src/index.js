import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import App from './App';

import reportWebVitals from './reportWebVitals';

import { CoursesProvider } from './helpers/context/courses.context';
import { AuthorsProvider } from './helpers/context/authors.context';
import { UserProvider } from './helpers/context/user.context';

import { CreateCourseProvider } from './helpers/context/createCourse.contex';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<UserProvider>
			<CoursesProvider>
				<AuthorsProvider>
					<CreateCourseProvider>
						<BrowserRouter>
							<App />
						</BrowserRouter>
					</CreateCourseProvider>
				</AuthorsProvider>
			</CoursesProvider>
		</UserProvider>
	</React.StrictMode>
);

reportWebVitals();
