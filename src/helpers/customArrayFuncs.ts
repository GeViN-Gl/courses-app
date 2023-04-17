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
	requestedAuthorsIds: string[]
): string | null => {
	const names = requestedAuthorsIds
		.map((requestedAuthorId) =>
			allAuthors.find((author) => author.id === requestedAuthorId)
		)
		.filter((res) => res !== undefined)
		.map((auth) => auth?.name)
		.join(', ');
	return names === '' ? null : names;
};
