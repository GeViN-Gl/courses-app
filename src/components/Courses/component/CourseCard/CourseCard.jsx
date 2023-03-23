import {
	CardContainer,
	TitleContainer,
	InfoContainer,
	InfoText,
} from './CourseCard.styles';
import Button from '../../../../common/Button/Button';
import { toHoursAndMinutes } from '../../../../helpers/timeConvert';

import { useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { AuthorsContext } from '../../../../helpers/context/authors.context';

const getStringWithAuthorsNames = (allAuthors, authorsIds) => {
	return authorsIds
		.map(
			(authorId) => allAuthors.find((authObj) => authObj.id === authorId)?.name
		)
		.filter((name) => name) // Remove undefined/null names
		.join(', ');
};

const CourseCard = ({ course }) => {
	const { id, title, description, creationDate, duration, authors } = course;

	const { authorsList } = useContext(AuthorsContext);

	const navigate = useNavigate();

	const showCourseNavigateHandler = () => navigate(id);

	return (
		<CardContainer>
			<TitleContainer>
				<h2 className='title'>{title}</h2>
				<p className='description'>{description}</p>
			</TitleContainer>
			<InfoContainer>
				<InfoText isMaxLengthApply>
					<span>Authors: </span>
					{getStringWithAuthorsNames(authorsList, authors)}
				</InfoText>
				<InfoText>
					<span>Duration: </span>
					{toHoursAndMinutes(duration)}
				</InfoText>
				<InfoText>
					<span>Created: </span>
					{creationDate}
				</InfoText>
				<Button onClick={showCourseNavigateHandler}>Show course</Button>
			</InfoContainer>
		</CardContainer>
	);
};

export default CourseCard;
