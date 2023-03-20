import './App.css';

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
		<div>
			<Header />
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
			{isCoursesDisplayed && <Courses />}
			{isAddCourseDisplayed && <CreateCourse />}
		</div>
	);
}

export default App;

// let myuuid = crypto.randomUUID();
// console.log('Your UUID is: ' + myuuid);
