import { createContext, useState } from 'react';
import { mockedCoursesList } from '../../constants';

// actual value i want to access
export const CoursesContext = createContext({
  setCoursesList: () => null,
  coursesList: null,
});

export const CoursesProvider = ({ children }) => {
  const [coursesList, setCoursesList] = useState(mockedCoursesList);

  const value = { coursesList, setCoursesList };
  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
};
