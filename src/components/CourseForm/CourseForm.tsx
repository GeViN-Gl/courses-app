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
	useLocation,
} from 'react-router-dom';
import { toastNotify } from '../../helpers/toastNotify';
import { AnyAction, Dispatch } from 'redux';
import { selectCoursesList } from '../../store/courses/selectors';
import { toHoursAndMinutes } from '../../helpers/timeConvert';
import { getArrayWithAuthors } from '../../helpers/customArrayFuncs';
import { sendNewCourseToAPI, sendUpdatedCourseToAPI } from '../../servises';
import { selectCurrentUserToken } from '../../store/user/selectors';

const CourseForm: FC = () => {
	// react-router-dom variables
	const navigate: NavigateFunction = useNavigate();
	const { courseId } = useParams();
	const currentLocation = useLocation();

	// redux variables
	const dispatch: Dispatch<AnyAction> = useDispatch();
	const courseTitle = useSelector(selectCourseTitle);
	const courseDescription = useSelector(selectCourseDescription);
	const addedAuthorsList = useSelector(selectAddedAuthorsList);
	const timeMinutes = useSelector(selectTimeMinutes);
	const coursesList = useSelector(selectCoursesList);
	const token = useSelector(selectCurrentUserToken);
	const authorsList = useSelector(selectAuthorsList);

	// local state
	const [isReadyToAddNewCourse, setIsReadyToAddNewCourse] = useState(false);
	// local state course object
	const defaultCourseObj: Course = {
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: 0,
		authors: [],
	};
	const [courseObj, setCourseObj] = useState<Course>(defaultCourseObj);

	// Mode detection
	// Now i have 2 modes: ADD for add new course behavior and UPDATE for update course
	// They using different API methods, so i need to know which mode i am in
	type Mode = 'ADD' | 'UPDATE';
	let mode: Mode = 'ADD';
	if (currentLocation.pathname.includes('add')) {
		mode = 'ADD';
	}
	if (currentLocation.pathname.includes('update')) {
		mode = 'UPDATE';
	}

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

	// UPDATE COURSE
	// Logic very similar to add new course, but now API need to know course id
	// async handler for updateCourseButtonHandler
	const updateCourseAsyncHandler = async (
		token: string,
		courseToApi: {
			title: string;
			description: string;
			duration: number;
			authors: string[];
		}
	): Promise<Course | undefined> => {
		if (!token || !courseToApi || !courseId) return;
		const updatedCourseResponse = await sendUpdatedCourseToAPI(
			token,
			courseToApi,
			courseId
		);
		if (updatedCourseResponse.successful) {
			toastNotify('Course updated successfully');
			return updatedCourseResponse.result;
		}
	};

	// button handler for "Update course" button
	const updateCourseButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!isReadyToAddNewCourse) {
			toastNotify(
				`Please fill all fields before ${
					mode === 'ADD' ? 'creating new' : 'updating'
				} course`
			);
			return;
		}
		updateCourseAsyncHandler(token, {
			title: courseObj.title,
			description: courseObj.description,
			duration: courseObj.duration,
			authors: courseObj.authors,
		})
			.then((newCourse) => {
				if (newCourse) {
					dispatch(updateCourseInList(newCourse));
					clearFormFields();
					// navigate back to courses
					navigate('/courses');
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// ADD NEW COURSE
	// Add new course to API and to redux store
	// async handler for createCourseButtonHandler
	const addNewCourseAsyncHandler = async (
		token: string,
		courseToApi: {
			title: string;
			description: string;
			duration: number;
			authors: string[];
		}
	): Promise<Course | undefined> => {
		if (!token || !courseToApi) return;
		const newCourseResponse = await sendNewCourseToAPI(token, courseToApi);
		if (newCourseResponse.successful) {
			toastNotify('New course added successfully');
			return newCourseResponse.result;
		}
	};
	// this handler is for "Add new course" button
	const createCourseButtonHandler = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (!isReadyToAddNewCourse) {
			toastNotify(
				`Please fill all fields before ${
					mode === 'ADD' ? 'creating new' : 'updating'
				} course`
			);
			return;
		}
		addNewCourseAsyncHandler(token, {
			title: courseObj.title,
			description: courseObj.description,
			duration: courseObj.duration,
			authors: courseObj.authors,
		})
			.then((newCourse) => {
				if (newCourse) {
					dispatch(addNewCourseToList(newCourse));
					clearFormFields();
					// navigate back to courses
					navigate('/courses');
				}
			})
			.catch((err) => {
				console.error(err);
			});
	};

	// Form handlers
	const titleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		dispatch(setCourseTitle(event.target.value));
	};

	const descriptionInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		dispatch(setCourseDescription(event.target.value));
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

	// useEffect to regenerate new course object
	useEffect(() => {
		const authorsIdsList = addedAuthorsList.map((author) => author.id);

		const newCourseObj: Course = {
			id: '', // will be generated on server
			title: courseTitle,
			description: courseDescription,
			creationDate: '', // will be generated on server
			duration: timeMinutes,
			authors: authorsIdsList,
		};
		setCourseObj(newCourseObj);
	}, [courseTitle, courseDescription, addedAuthorsList, timeMinutes]);

	// on mount if mode is UPDATE  i need to rehydrate courseObj
	useEffect(() => {
		// rehydrating courseObj
		if (mode === 'UPDATE') {
			if (!courseId) {
				throw new Error('Error: courseId is undefined');
			}

			const courseToUpdate = coursesList.find(
				(course) => course.id === courseId
			);

			if (courseToUpdate) {
				const addedAuthorsIdToUpdate = getArrayWithAuthors(
					authorsList,
					courseToUpdate.authors
				);

				dispatch(setCourseTitle(courseToUpdate.title));
				dispatch(setCourseDescription(courseToUpdate.description));
				if (addedAuthorsIdToUpdate)
					// if there are authors
					dispatch(setAddedAuthorsList(addedAuthorsIdToUpdate)); // no need to set NotAdded, i have useEffect that care about it

				dispatch(setTimeMinutes(courseToUpdate.duration));
				dispatch(setTimeHours(toHoursAndMinutes(courseToUpdate.duration)));

				const newCourseObj: Course = {
					id: courseToUpdate.id,
					title: courseToUpdate.title,
					description: courseToUpdate.description,
					creationDate: courseToUpdate.creationDate,
					duration: courseToUpdate.duration,
					authors: courseToUpdate.authors,
				};
				setCourseObj(newCourseObj);
			}
		}
	}, []);
	// Dependencies are empty because i need to run this effect only once
	// all other changes will be handled by other useEffects
	// it`s because this component is reused for both ADD and UPDATE

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
			{mode === 'UPDATE' ? (
				<Button onClick={updateCourseButtonHandler}>Update course</Button>
			) : (
				<Button onClick={createCourseButtonHandler}>Create course</Button>
			)}
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
