import {
	CardContainer,
	TitleContainer,
	InfoContainer,
	InfoText,
} from './CourseCard.styles';
import Button from '../../../../common/Button/Button';
import { toHoursAndMinutes } from '../../../../helpers/timeConvert';

import { NavigateFunction, useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { Course } from '../../../../store/courses/reducer';
import { selectAuthorsList } from '../../../../store/authors/selectors';

import { getStringWithAuthorsNames } from '../../../../helpers/customArrayFuncs';
import { FC } from 'react';

type CourseCardProps = {
	course: Course;
};

const CourseCard: FC<CourseCardProps> = ({ course }) => {
	const { id, title, description, creationDate, duration, authors } = course;

	const authorsList = useSelector(selectAuthorsList);

	const navigate: NavigateFunction = useNavigate();

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
