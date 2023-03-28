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

export const mockedAuthorsList = [
	{
		id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
		name: 'Vasiliy Dobkin',
	},
	{
		id: 'f762978b-61eb-4096-812b-ebde22838167',
		name: 'Nicolas Kim',
	},
	{
		id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
		name: 'Anna Sidorenko',
	},
	{
		id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
		name: 'Valentina Larina',
	},
];
