import './App.scss';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Registration from './components/Courses/component/Registration/Registration';
import Login from './components/Courses/component/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from 'react-router-dom';
import React, { FC, useEffect } from 'react';
import {
	SuccessfullCourseRequest,
	SuccessfullAuthorRequest,
	getAllAuthorsFromAPI,
	getAllCoursesFromAPI,
} from './servises';
import { useDispatch } from 'react-redux';
import { setAuthorsList } from './store/authors/actionCreators';
import { setCoursesList } from './store/courses/actionCreators';
import { FailedRequest } from './helpers/dataFetchers';

// fix for crypto
// github.com/denoland/deno/issues/12754
declare global {
	interface Crypto {
		randomUUID: () => `${string}-${string}-${string}-${string}-${string}`;
	}
}
export {};

// this useEffect triggers fetching of authors list

const App: FC = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		// typeguard for authors list
		const isAuthorsFetchSuccess = (
			data: SuccessfullAuthorRequest | FailedRequest
		): data is SuccessfullAuthorRequest => data.successful;

		async function getAuthorFromBack(): Promise<void> {
			try {
				const data = await getAllAuthorsFromAPI();
				if (isAuthorsFetchSuccess(data)) {
					dispatch(setAuthorsList(data.result));
				}
			} catch (error) {
				console.error(error);
			}
		}
		getAuthorFromBack();
	}, [dispatch]);
	// this useEffect triggers rerendering of courses list
	useEffect(() => {
		// typeguard for courses list
		const isCoursesFetchSuccess = (
			data: SuccessfullCourseRequest | FailedRequest
		): data is SuccessfullCourseRequest => data.successful;

		async function getCoursesFromBack(): Promise<void> {
			try {
				const data = await getAllCoursesFromAPI();
				if (isCoursesFetchSuccess(data)) {
					dispatch(setCoursesList(data.result));
				}
			} catch (error) {
				console.error(error);
			}
		}
		getCoursesFromBack();
	}, [dispatch]);
	return (
		<>
			<Routes>
				<Route path='/' element={<Header />}>
					<Route path='courses/add' element={<CreateCourse />} />
					<Route path='courses/*'>
						<Route index element={<Courses />} />
						<Route path=':courseId' element={<CourseInfo />} />
					</Route>
					<Route path='registration' element={<Registration />} />
					<Route path='login' element={<Login />} />
					<Route path='*' element={<Courses />} />
				</Route>
			</Routes>
			<ToastContainer
				position='top-left'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</>
	);
};

export default App;

// {/* the toast container must be higher than the element where the toast will be called */}
