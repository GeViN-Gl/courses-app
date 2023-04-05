import './App.scss';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseForm from './components/CourseForm/CourseForm';
import Registration from './components/Courses/component/Registration/Registration';
import Login from './components/Courses/component/Login/Login';
import CourseInfo from './components/CourseInfo/CourseInfo';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from 'react-router-dom';
import React, { FC, useEffect } from 'react';

import { fetchAuthorsAsync } from './store/authors/thunk';
import { useThunkDispatch } from './helpers/hooks/useThunkDispath';
import { fetchCoursesAsync } from './store/courses/thunk';

//TODO migrate to 6.4 createBrowserRouter

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
	const thuckDispatch = useThunkDispatch();

	// this two useEffects triggers fetching of authors list and courses list
	useEffect(() => {
		thuckDispatch(fetchAuthorsAsync());
	}, [thuckDispatch]);
	useEffect(() => {
		thuckDispatch(fetchCoursesAsync());
	}, [thuckDispatch]);

	return (
		<>
			<Routes>
				<Route path='/' element={<Header />}>
					<Route path='courses/add' element={<CourseForm />} />
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
