import { FC, useCallback, MouseEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectNotAddedAuthorsList,
	selectAddedAuthorsList,
} from '../../../../store/create-course/selectors';
import {
	setNotAddedAuthorsList,
	setAddedAuthorsList,
} from '../../../../store/create-course/actionCreators';

import Button from '../../../../common/Button/Button';

import { Author } from '../../../../store/authors/reducer';

type AuthorCardProps = {
	author: Author;
	isAdd: boolean;
};

const AuthorCard: FC<AuthorCardProps> = ({ author, isAdd }) => {
	const dispatch = useDispatch();

	const notAddedAuthorsList = useSelector(selectNotAddedAuthorsList);
	const addedAuthorsList = useSelector(selectAddedAuthorsList);

	// Define a named function to handle the button click and cache it to avoid unnecessary rerendings

	const handleAuthorClick = useCallback(
		(event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();

			// Check if the author is in the notAdded list
			const isNotAdded = notAddedAuthorsList.some(
				(notAddedAuthor) => notAddedAuthor.id === author.id
			);

			// Check if the author is in the added list
			const isAdded = addedAuthorsList.some(
				(addedAuthor) => addedAuthor.id === author.id
			);

			// If the author is in the notAdded list
			if (isNotAdded) {
				// Transfer the author to the added list
				const authorToTransfer = notAddedAuthorsList.find(
					(notAddedAuthor) => notAddedAuthor.id === author.id
				);
				const newNotAddedAuthorsList = notAddedAuthorsList.filter(
					(notAddedAuthor) => notAddedAuthor.id !== author.id
				);
				dispatch(setNotAddedAuthorsList(newNotAddedAuthorsList));
				dispatch(setAddedAuthorsList([...addedAuthorsList, authorToTransfer!])); //authorToTransfer will exist if some() already give us TRUE
			}

			// If the author is in the added list
			if (isAdded) {
				// Transfer the author to the notAdded list
				const authorToTransfer = addedAuthorsList.find(
					(addedAuthor) => addedAuthor.id === author.id
				);
				const newAddedAuthorsList = addedAuthorsList.filter(
					(addedAuthor) => addedAuthor.id !== author.id
				);
				dispatch(setAddedAuthorsList(newAddedAuthorsList));
				dispatch(
					setNotAddedAuthorsList([...notAddedAuthorsList, authorToTransfer!]) //authorToTransfer will exist if some() already give us TRUE
				);
			}
		},
		// Linter asks you to add everything to the dependency array,
		// but I want it to react only on these two arrays
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[notAddedAuthorsList, addedAuthorsList]
	);

	return (
		<>
			<h4>{author.name}</h4>
			<Button onClick={handleAuthorClick}>
				{`${isAdd ? 'Add' : 'Delete'} author`}
			</Button>
		</>
	);
};

export default AuthorCard;
