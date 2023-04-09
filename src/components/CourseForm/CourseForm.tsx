import {
	CreateCourseContainer,
	TitleInput,
	DescriptionInput,
	AddAuthorContainer,
	AddAuthorBox,
	CourseAuthorsBox,
} from './CourseForm.styles';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorCarts from './components/AuthorCarts/AuthorCarts';
import AddAuthor from './components/AddAuthor/AddAuthor';
import Duration from './components/Duration/Duration';

import { useState, useEffect, MouseEvent, ChangeEvent, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthorsList } from '../../store/authors/selectors';

import {
	selectCourseTitle,
	selectAddedAuthorsList,
	selectTimeMinutes,
	selectCourseDescription,
} from '../../store/create-course/selectors';
import {
	addNewCourseToList,
	updateCourseInList,
} from '../../store/courses/actionCreators';
import {
	setAddedAuthorsList,
	setNotAddedAuthorsList,
	setCourseTitle,
	setCourseDescription,
	setTimeMinutes,
	setTimeHours,
} from '../../store/create-course/actionCreators';

// type imports
import { Course } from '../../store/courses/reducer';

import {
	useNavigate,
	Link,
	NavigateFunction,
	useParams,
} from 'react-router-dom';
import { toastNotify } from '../../helpers/toastNotify';
import { AnyAction, Dispatch } from 'redux';
import { selectCoursesList } from '../../store/courses/selectors';
import { toHoursAndMinutes } from '../../helpers/timeConvert';
import { getArrayWithAuthors } from '../../helpers/customArrayFuncs';
import { sendNewCourseToAPI, sendUpdatedCourseToAPI } from '../../servises';
import { selectCurrentUserToken } from '../../store/user/selectors';

type CourseFormProps = {
	isUpdate?: boolean;
};

const CourseForm: FC<CourseFormProps> = ({ isUpdate }) => {
	console.log('isUpdate:', isUpdate);
	// react-router-dom variables
	const navigate: NavigateFunction = useNavigate();
	const { courseId } = useParams();

	// redux variables
	const dispatch: Dispatch<AnyAction> = useDispatch();
	const title = useSelector(selectCourseTitle);
	const description = useSelector(selectCourseDescription);
	const addedAuthorsList = useSelector(selectAddedAuthorsList);
	const timeMinutes = useSelector(selectTimeMinutes);
	const coursesList = useSelector(selectCoursesList);
	const token = useSelector(selectCurrentUserToken);
	const authorsList = useSelector(selectAuthorsList);

	// local state
	const [isReadyToAddNewCourse, setIsReadyToAddNewCourse] = useState(false);
	const [isRehydrated, setIsRehydrated] = useState(false);
	console.log('isRehydrated:', isRehydrated);

	//--------------------------------------------

	// HELPERS
	const clearFormFields = () => {
		dispatch(setCourseTitle(''));
		dispatch(setCourseDescription(''));
		dispatch(setAddedAuthorsList([])); // no need to set NotAdded, i have useEffect that care about it
		dispatch(setTimeMinutes(0));
		dispatch(setTimeHours('00:00'));
	};

	// --------------------------------------------
	// MAIN HANDLERS
	useEffect(() => {
		if (isUpdate && !courseId) throw new Error('Error: courseId is undefined');
		if (isUpdate && !isRehydrated) {
			const courseToUpdate = coursesList.find(
				(course) => course.id === courseId
			);
			if (!courseToUpdate) throw new Error('Error: No course with this id');

			const addedAuthorsIdsToRehydrate = getArrayWithAuthors(
				authorsList,
				courseToUpdate.authors
			);
			if (!addedAuthorsIdsToRehydrate)
				throw new Error('Error: No authors with this id');
			dispatch(setCourseTitle(courseToUpdate.title));
			dispatch(setCourseDescription(courseToUpdate.description));
			dispatch(setAddedAuthorsList(addedAuthorsIdsToRehydrate));
			dispatch(setTimeMinutes(courseToUpdate.duration));
			dispatch(setTimeHours(toHoursAndMinutes(courseToUpdate.duration)));
			setIsRehydrated(true);
		}
		//
	}, [authorsList, courseId, coursesList, dispatch, isRehydrated, isUpdate]);

	// BIG gutton
	const commonButtonHandler = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!isReadyToAddNewCourse) {
			//TODO: add toast
			toastNotify(
				`Please fill all fields before ${isUpdate ? 'update' : 'create'} course`
			);
			return;
		}
		try {
			let responce: { successful: boolean; result: Course };
			if (!isUpdate) {
				// ADD NEW COURSE
				responce = await sendNewCourseToAPI(token, {
					title,
					description,
					duration: timeMinutes,
					authors: addedAuthorsList.map((author) => author.id), // i need only id's of authors in new course
				});
			} else {
				responce = await sendUpdatedCourseToAPI(
					token,
					{
						title,
						description,
						duration: timeMinutes,
						authors: addedAuthorsList.map((author) => author.id), // i need only id's of authors in new course
					},
					courseId! // i know that courseId is not undefined, because i check it in useEffect
				);
			}

			if (responce.successful) {
				isUpdate
					? dispatch(updateCourseInList(responce.result))
					: dispatch(addNewCourseToList(responce.result));
				clearFormFields();
				// navigate back to courses
				navigate('/courses');
			}
		} catch (error) {}
	};

	// useEffect to balance added / NOTadded authorLists
	useEffect(() => {
		// if authorsList changed
		// replace notAddedAuthorList with new authorsList - addedAuthorList
		let newNotAddedAuthorList = [...authorsList];

		// forEach author in already added list i need to remove it from notAdded
		addedAuthorsList.forEach((addedAuthor) => {
			const authorsWithoutAlreadyAdded = newNotAddedAuthorList.filter(
				(notAdded) => notAdded.id !== addedAuthor.id
			);
			newNotAddedAuthorList = [...authorsWithoutAlreadyAdded];
		});
		dispatch(setNotAddedAuthorsList(newNotAddedAuthorList));
	}, [authorsList, addedAuthorsList, dispatch]);

	// useEffect to check if current course object is ready to be added
	useEffect(() => {
		if (
			!!title &&
			!!description &&
			addedAuthorsList.length > 0 &&
			timeMinutes !== 0
		) {
			setIsReadyToAddNewCourse(true);
		} else {
			setIsReadyToAddNewCourse(false);
		}
	}, [addedAuthorsList.length, description, timeMinutes, title]);

	// Form handlers
	const titleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		dispatch(setCourseTitle(event.target.value));
	};

	const descriptionInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		dispatch(setCourseDescription(event.target.value));
	};

	return (
		<CreateCourseContainer>
			<Link to='/courses' onClick={clearFormFields}>
				↩️ Back to courses
			</Link>
			<TitleInput>
				<Input
					labelText='Title'
					placeholderText='Enter title...'
					onChange={titleInputHandler}
					value={title}
				/>
			</TitleInput>

			<Button onClick={commonButtonHandler}>{`${
				isUpdate ? 'Update' : 'Create'
			} course`}</Button>
			<DescriptionInput>
				<Input
					isTextArea={true}
					labelText='Description'
					placeholderText='Enter description...'
					onChange={descriptionInputHandler}
					value={description}
				/>
			</DescriptionInput>
			<AddAuthorContainer>
				<AddAuthorBox>
					<AddAuthor />
					<Duration />
				</AddAuthorBox>
				<CourseAuthorsBox>
					<AuthorCarts />
				</CourseAuthorsBox>
			</AddAuthorContainer>
		</CreateCourseContainer>
	);
};

export default CourseForm;
