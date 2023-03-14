import { createContext, useState, useEffect } from 'react';
import { mockedCoursesList } from '../../constants';

// actual value i want to access
export const CoursesContext = createContext({
  setCoursesList: () => null,
  coursesList: null,
  filderedCoursesList: () => null,
  setFilderedCoursesList: null,
  filterField: () => null,
  setFilterField: '',
});

export const CoursesProvider = ({ children }) => {
  const [coursesList, setCoursesList] = useState(mockedCoursesList);
  const [filderedCoursesList, setFilderedCoursesList] = useState(coursesList);
  const [filterField, setFilterField] = useState('');

  useEffect(() => {
    const newFilderedCoursesList = coursesList.filter((course) => {
      // if search field is empty display all courses
      if (!filterField) {
        return true;
      }
      let isIdInclude = course.id
        .toLowerCase()
        .includes(filterField.toLowerCase());
      let isTitleInclude = course.title
        .toLowerCase()
        .includes(filterField.toLowerCase());

      return isIdInclude || isTitleInclude;
    });
    setFilderedCoursesList(newFilderedCoursesList);
  }, [filterField, coursesList]);

  const value = {
    coursesList,
    setCoursesList,
    filderedCoursesList,
    setFilderedCoursesList,
    filterField,
    setFilterField,
  };
  return (
    <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
  );
};
