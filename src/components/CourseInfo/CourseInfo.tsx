import {
	CourseInfoContainer,
	GoBackLink,
	InfoWrapper,
	Description,
	InfoField,
	Key,
} from './CourseInfo.styles';
import { CustomTitle } from '../../common/CustomTitle/CustomTitle';

import { useSelector } from 'react-redux';
import { selectAuthorsList } from '../../store/authors/selectors';
import { selectCoursesList } from '../../store/courses/selectors';

import { toHoursAndMinutes } from '../../helpers/timeConvert';
import { getArrayWithAuthors } from '../../helpers/customArrayFuncs';

import { useParams } from 'react-router-dom';

import { Author } from '../../store/authors/reducer';

const CourseInfo = () => {
	const coursesList = useSelector(selectCoursesList);
	const authorsList = useSelector(selectAuthorsList);

	const { courseId } = useParams();

	// find course to render
	const courseToRender = coursesList.find((course) => course.id === courseId);
	if (!courseToRender) {
		return <h1>Error</h1>;
	}
	const { id, creationDate, description, duration, title, authors } =
		courseToRender;

	const arrayWithAuthors = getArrayWithAuthors(authorsList, authors);
	type ArrayWithAuthors = typeof arrayWithAuthors;
	const isArrayWithAuthorsExist = (
		arrayWithAuthors: ArrayWithAuthors
	): arrayWithAuthors is Author[] => arrayWithAuthors !== null;

	return (
		<CourseInfoContainer>
			<GoBackLink to='/courses'>↩️ Back to courses</GoBackLink>
			<CustomTitle>{title}</CustomTitle>
			<Description>{description}</Description>
			<InfoWrapper>
				<InfoField>
					<Key>ID:</Key> {id}
				</InfoField>
				<InfoField>
					<Key>Duration:</Key> {toHoursAndMinutes(duration)}
				</InfoField>
				<InfoField>
					<Key>Created:</Key> {creationDate}
				</InfoField>
				<InfoField>
					<Key>Authors:</Key>
				</InfoField>
				<InfoField as='ul' column={true}>
					{isArrayWithAuthorsExist(arrayWithAuthors) &&
						arrayWithAuthors.map((author) => (
							<li key={author.id}>{author.name}</li>
						))}
				</InfoField>
			</InfoWrapper>
		</CourseInfoContainer>
	);
};

export default CourseInfo;
