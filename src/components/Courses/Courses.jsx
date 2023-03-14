import CourseCard from './component/CourseCard/CourseCard';
import SearchBar from './component/SearchBar/SearchBar';

import { useContext } from 'react';
import { CoursesContext } from '../../helpers/context/courses.context';

import { CoursesContainer } from './Courses.styles';

const Courses = () => {
  const { filderedCoursesList } = useContext(CoursesContext);

  return (
    <CoursesContainer>
      <SearchBar />
      {filderedCoursesList.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </CoursesContainer>
  );
};

export default Courses;
