import './App.scss';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from 'react';
import { DisplayContext } from './helpers/context/display.context';

function App() {
	const { isCoursesDisplayed, isAddCourseDisplayed } =
		useContext(DisplayContext);

	return (
		<div className='App'>
			<Header />
			{isCoursesDisplayed && <Courses />}
			{isAddCourseDisplayed && <CreateCourse />}
			{/* the toast container must be higher than the element where the toast will be called */}
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
		</div>
	);
}

export default App;

// let myuuid = crypto.randomUUID();
// console.log('Your UUID is: ' + myuuid);
