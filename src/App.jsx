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

function App() {
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
}

export default App;

// {/* the toast container must be higher than the element where the toast will be called */}
