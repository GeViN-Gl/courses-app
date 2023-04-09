import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from 'react-router-dom';

import React from 'react';
import Header from '../components/Header/Header';
import CourseForm from '../components/CourseForm/CourseForm';
import CourseInfo from '../components/CourseInfo/CourseInfo';
import Courses from '../components/Courses/Courses';
import Login from '../components/Courses/component/Login/Login';
import Registration from '../components/Courses/component/Registration/Registration';
import PrivateRoute from '../components/PrivateRouter/PrivateRouter';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path='/' element={<Header />}>
				<Route
					path='courses/add'
					element={
						<PrivateRoute>
							<CourseForm />
						</PrivateRoute>
					}
				/>
				<Route
					path='/courses/update/:courseId'
					element={
						<PrivateRoute>
							<CourseForm isUpdate />
						</PrivateRoute>
					}
				/>
				<Route path='courses/*'>
					<Route index element={<Courses />} />
					<Route path=':courseId' element={<CourseInfo />} />
				</Route>
				<Route path='registration' element={<Registration />} />
				<Route path='login' element={<Login />} />
				<Route path='*' element={<Courses />} />
			</Route>
		</>
	)
);

export default router;
