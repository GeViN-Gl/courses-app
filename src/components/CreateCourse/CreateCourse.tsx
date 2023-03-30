import {
	CreateCourseContainer,
	TitleInput,
	DescriptionInput,
	AddAuthorContainer,
	AddAuthorBox,
	DurationBox,
	CourseAuthorsBox,
} from './CreateCourse.styles';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import AuthorCarts from './components/AuthorCarts/AuthorCarts';
import AddAuthor from './components/AddAuthor/AddAuthor';
import Duration from './components/Duration/Duration';

import { useState, useEffect, MouseEvent, ChangeEvent, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAuthorsList } from '../../store/authors/selectors';
import { selectCoursesList } from '../../store/courses/selectors';
import {
	selectCourseTitle,
	selectAddedAuthorsList,
	selectTimeMinutes,
	selectCourseDescription,
} from '../../store/create-course/selectors';
import { setCoursesList } from '../../store/courses/actionCreators';
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

import { useNavigate, Link, NavigateFunction } from 'react-router-dom';
import { toastNotify } from '../../helpers/toastNotify';
import { AnyAction, Dispatch } from 'redux';

const getCurrentDate = () => {
	const today = new Date();
	const day = today.getDate().toString();
	const month = (today.getMonth() + 1).toString(); // JavaScript months are zero-based, so we need to add 1
	const year = today.getFullYear().toString();
	return `${day}/${month}/${year}`;
};

const CreateCourse: FC = () => {
	const dispatch: Dispatch<AnyAction> = useDispatch();
	const navigate: NavigateFunction = useNavigate();
	// redux vars
	const courseTitle = useSelector(selectCourseTitle);
	const courseDescription = useSelector(selectCourseDescription);
	const addedAuthorsList = useSelector(selectAddedAuthorsList);
	const timeMinutes = useSelector(selectTimeMinutes);

	const clearFormFields = () => {
		dispatch(setCourseTitle(''));
		dispatch(setCourseDescription(''));
		dispatch(setAddedAuthorsList([])); // no need to set NotAdded, i have useEffect that care about it
		dispatch(setTimeMinutes(0));
		dispatch(setTimeHours('00:00'));
	};

	const [isReadyToAddNewCourse, setIsReadyToAddNewCourse] = useState(false);

	//
	const defaultCourseObj: Course = {
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: 0,
		authors: [],
	};

	const [courseObj, setCourseObj] = useState<Course>(defaultCourseObj);

	// useEffect to balance added / NOTadded authorLists
	const authorsList = useSelector(selectAuthorsList);
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

	// useEffect to regenerate new course object
	useEffect(() => {
		const authorsIdsList = addedAuthorsList.map((author) => author.id);

		const newCourseObj: Course = {
			id: crypto.randomUUID(),
			title: courseTitle,
			description: courseDescription,
			creationDate: getCurrentDate(),
			duration: timeMinutes,
			authors: authorsIdsList,
		};
		setCourseObj(newCourseObj);
	}, [courseTitle, courseDescription, addedAuthorsList, timeMinutes]);

	// useEffect to check if current course object is ready to be added
	useEffect(() => {
		if (
			!!courseObj.title &&
			!!courseObj.description &&
			courseObj.authors.length > 0 &&
			courseObj.duration !== 0
		) {
			setIsReadyToAddNewCourse(true);
		} else {
			setIsReadyToAddNewCourse(false);
		}
	}, [courseObj]);

	const coursesList = useSelector(selectCoursesList);
	const createCourseButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!isReadyToAddNewCourse) {
			toastNotify('Please fill all fields before creating new course');
			// toast looks nicer )
			// alert('Please fill all fields before creating new course');
			return;
		}

		dispatch(setCoursesList([...coursesList, courseObj]));

		// clear fields
		clearFormFields();
		// navigate back to courses
		navigate('/courses');
	};

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
					value={courseTitle}
				/>
			</TitleInput>
			<Button onClick={createCourseButtonHandler}>Create course</Button>
			<DescriptionInput>
				<Input
					isTextArea={true}
					labelText='Description'
					placeholderText='Enter description...'
					onChange={descriptionInputHandler}
					value={courseDescription}
				/>
			</DescriptionInput>
			<AddAuthorContainer>
				<AddAuthorBox>
					<AddAuthor />
				</AddAuthorBox>
				<DurationBox>
					<Duration />
				</DurationBox>
				<CourseAuthorsBox>
					<AuthorCarts />
				</CourseAuthorsBox>
			</AddAuthorContainer>
		</CreateCourseContainer>
	);
};

export default CreateCourse;
