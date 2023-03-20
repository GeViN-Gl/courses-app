import { createContext, useState } from 'react';

export const DisplayContext = createContext({
	isCoursesDisplayed: null,
	setIsCoursesDisplayed: () => null,
	isAddCourseDisplayed: null,
	setIsAddCourseDisplayed: () => null,
});

export const DisplayProvider = ({ children }) => {
	const [isCoursesDisplayed, setIsCoursesDisplayed] = useState(true);
	const [isAddCourseDisplayed, setIsAddCourseDisplayed] = useState(false);

	const value = {
		isCoursesDisplayed,
		setIsCoursesDisplayed,
		isAddCourseDisplayed,
		setIsAddCourseDisplayed,
	};
	return (
		<DisplayContext.Provider value={value}>{children}</DisplayContext.Provider>
	);
};
