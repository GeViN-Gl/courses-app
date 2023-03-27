import { createContext, useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { selectAuthorsList } from '../../store/authors/selectors';

// actual value i want to access
export const CreateCourseContext = createContext({
	notAddedAuthorList: null,
	setNotAddedAuthorList: () => null,
	addedAuthorList: null,
	setAddedAuthorList: () => null,
	timeStr: null,
	setTimeStr: () => null,
	courseTitle: null,
	setCourseTitle: () => null,
	courseDescription: null,
	setCourseDescription: () => null,
	timeNum: null,
	setTimeNum: () => null,
});

export const CreateCourseProvider = ({ children }) => {
	const authorsList = useSelector(selectAuthorsList);
	const [notAddedAuthorList, setNotAddedAuthorList] = useState(authorsList);
	const [addedAuthorList, setAddedAuthorList] = useState([]);
	const [timeStr, setTimeStr] = useState('00:00');
	const [timeNum, setTimeNum] = useState(0);
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');

	useEffect(() => {
		// if authorsList changed
		// replace notAddedAuthorList with new authorsList - addedAuthorList
		let newNotAddedAuthorList = [...authorsList];

		// forEach author in already added list i need to remove it from notAdded
		addedAuthorList.forEach((addedAuthor) => {
			const authorsWithoutAlreadyAdded = newNotAddedAuthorList.filter(
				(notAdded) => notAdded.id !== addedAuthor.id
			);
			newNotAddedAuthorList = [...authorsWithoutAlreadyAdded];
		});
		setNotAddedAuthorList(newNotAddedAuthorList);
	}, [authorsList, addedAuthorList]);

	const value = {
		notAddedAuthorList,
		addedAuthorList,
		setNotAddedAuthorList,
		setAddedAuthorList,
		timeStr,
		setTimeStr,
		courseTitle,
		setCourseTitle,
		courseDescription,
		setCourseDescription,
		timeNum,
		setTimeNum,
	};
	return (
		<CreateCourseContext.Provider value={value}>
			{children}
		</CreateCourseContext.Provider>
	);
};
