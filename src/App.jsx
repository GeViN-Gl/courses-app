import './App.css';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';

import { useContext } from 'react';
import { DisplayContext } from './helpers/context/display.context';

function App() {
  const { isCoursesDisplayed, isAddCourseDisplayed } =
    useContext(DisplayContext);

  return (
    <div>
      <Header />
      {isCoursesDisplayed && <Courses />}
      {isAddCourseDisplayed && <CreateCourse />}
    </div>
  );
}

export default App;

// let myuuid = crypto.randomUUID();
// console.log('Your UUID is: ' + myuuid);
