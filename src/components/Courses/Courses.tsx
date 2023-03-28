import CourseCard from './component/CourseCard/CourseCard';
import SearchBar from './component/SearchBar/SearchBar';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	selectFilterField,
	selectCoursesList,
} from '../../store/courses/selectors';

import { CoursesContainer } from './Courses.styles';

const Courses = () => {
	const filterField = useSelector(selectFilterField);
	const coursesList = useSelector(selectCoursesList);

	const [filderedCoursesList, setFilderedCoursesList] = useState(coursesList);

	// This useEffect triggers rerending of filtered courses from SearchBar
	useEffect(() => {
		const newFilderedCoursesList = coursesList.filter((course) => {
			// if search field is empty display all courses
			if (!filterField) {
				return true;
			}
			const isIdInclude = course.id
				.toLowerCase()
				.includes(filterField.toLowerCase());
			const isTitleInclude = course.title
				.toLowerCase()
				.includes(filterField.toLowerCase());

			return isIdInclude || isTitleInclude;
		});
		setFilderedCoursesList(newFilderedCoursesList);
	}, [filterField, coursesList]);

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
