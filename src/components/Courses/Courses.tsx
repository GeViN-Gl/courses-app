import CourseCard from './component/CourseCard/CourseCard';
import SearchBar from './component/SearchBar/SearchBar';

import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
	selectFilterField,
	selectCoursesList,
} from '../../store/courses/selectors';
import { Course } from '../../store/courses/reducer';

import { CoursesContainer } from './Courses.styles';

const Courses: FC = () => {
	const filterField: string = useSelector(selectFilterField);
	const coursesList: Course[] = useSelector(selectCoursesList);

	const [filderedCoursesList, setFilderedCoursesList] =
		useState<Course[]>(coursesList);

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
