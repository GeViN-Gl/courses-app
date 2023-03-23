import {
	CourseInfoContainer,
	GoBackLink,
	InfoWrapper,
	Description,
	InfoField,
	Key,
} from './CourseInfo.styles';
import { CustomTitle } from '../../common/CustomTitle/CustomTitle';

import { useContext } from 'react';
import { CoursesContext } from '../../helpers/context/courses.context';
import { AuthorsContext } from '../../helpers/context/authors.context';

import { toHoursAndMinutes } from '../../helpers/timeConvert';
import { getArrayWithAuthors } from '../../helpers/customArrayFuncs';

import { useParams } from 'react-router-dom';

const CourseInfo = () => {
	const { coursesList } = useContext(CoursesContext);
	const { authorsList } = useContext(AuthorsContext);

	const { courseId } = useParams(); //or useLocation?

	const { id, creationDate, description, duration, title, authors } =
		coursesList.find((course) => course.id === courseId);

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
					{getArrayWithAuthors(authorsList, authors).map((author) => (
						<li key={author.id}>{author.name}</li>
					))}
				</InfoField>
			</InfoWrapper>
		</CourseInfoContainer>
	);
};

export default CourseInfo;
