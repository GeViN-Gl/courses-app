import './App.scss';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Registration from './components/Courses/component/Registration/Registration';
import { Login } from './components/Courses/component/Login/Login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useContext } from 'react';
// import { DisplayContext } from './helpers/context/display.context';

import { Routes, Route } from 'react-router-dom';

function App() {
	// const { isCoursesDisplayed, isAddCourseDisplayed } =
	// 	useContext(DisplayContext);

	return (
		<>
			<Routes>
				<Route path='/' element={<Header />}>
					<Route path='courses' element={<Courses />} />
					<Route path='registration' element={<Registration />} />
					<Route path='login' element={<Login />} />
					<Route path='create' element={<CreateCourse />} />
				</Route>
			</Routes>
			<ToastContainer
				position='top-left'
				autoClose={5000}
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
}

export default App;

// <Header />
// {isCoursesDisplayed && <Courses />}
// {isAddCourseDisplayed && <CreateCourse />}
// {/* the toast container must be higher than the element where the toast will be called */}
