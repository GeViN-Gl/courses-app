import {
	CardContainer,
	TitleContainer,
	InfoContainer,
	InfoText,
	ButtonsContainer,
} from './CourseCard.styles';
import Button from '../../../../common/Button/Button';
import { toHoursAndMinutes } from '../../../../helpers/timeConvert';

import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Course } from '../../../../store/courses/reducer';
import { selectAuthorsList } from '../../../../store/authors/selectors';

import { getStringWithAuthorsNames } from '../../../../helpers/customArrayFuncs';
import { FC, MouseEvent } from 'react';
import { AnyAction, Dispatch } from 'redux';
import {
	deleteCourseFromList,
	updateCourseInList,
} from '../../../../store/courses/actionCreators';

type CourseCardProps = {
	course: Course;
};

const CourseCard: FC<CourseCardProps> = ({ course }) => {
	const dispatch: Dispatch<AnyAction> = useDispatch();
	const { id, title, description, creationDate, duration, authors } = course;

	const authorsList = useSelector(selectAuthorsList);

	const navigate: NavigateFunction = useNavigate();

	const showCourseNavigateHandler = () => navigate(id);

	const deleteCourseButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		dispatch(deleteCourseFromList(id));
	};
	const updateCourseButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		navigate(`update/${id}`);
	};

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
				<ButtonsContainer>
					<Button onClick={showCourseNavigateHandler}>Show&nbsp;course</Button>
					<Button narrow={true} onClick={updateCourseButtonHandler}>
						📝
					</Button>
					<Button narrow={true} onClick={deleteCourseButtonHandler}>
						❌
					</Button>
				</ButtonsContainer>
			</InfoContainer>
		</CardContainer>
	);
};

export default CourseCard;
