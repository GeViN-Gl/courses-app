import { Author } from '../store/authors/reducer';

export const getArrayWithAuthors = (
	allAuthors: Author[],
	requestedAuthorsIds: string[]
): Author[] | null => {
	const mappedResult = requestedAuthorsIds
		.map((requestedAuthorId) =>
			allAuthors.find((author) => author.id === requestedAuthorId)
		)
		.filter((res) => res !== undefined);
	if (mappedResult.length === 0) return null;
	return mappedResult as Author[];
};

export const getStringWithAuthorsNames = (
	allAuthors: Author[],
	authorsIds: string[]
): string | null => {
	const mappedResult = getArrayWithAuthors(allAuthors, authorsIds);
	if (mappedResult === null) return null;
	const names = mappedResult.map(({ name }) => name).join(', ');
	return names;
};
