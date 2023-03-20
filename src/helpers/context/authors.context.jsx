import { createContext, useState } from 'react';
import { mockedAuthorsList } from '../../constants';

// actual value i want to access
export const AuthorsContext = createContext({
	setAuthorsList: () => null,
	authorsList: null,
});

export const AuthorsProvider = ({ children }) => {
	const [authorsList, setAuthorsList] = useState(mockedAuthorsList);

	const value = { authorsList, setAuthorsList };
	return (
		<AuthorsContext.Provider value={value}>{children}</AuthorsContext.Provider>
	);
};
