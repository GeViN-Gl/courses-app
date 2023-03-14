import CourseCard from './component/CourseCard/CourseCard';

import { useContext } from 'react';
import { CoursesContext } from '../../helpers/context/courses.context';

const Courses = () => {
  const { coursesList } = useContext(CoursesContext);

  return (
    <div>
      Courses
      {coursesList.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Courses;
