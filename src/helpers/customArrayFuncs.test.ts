import {
	getArrayWithAuthors,
	getStringWithAuthorsNames,
} from './customArrayFuncs';

describe('getArrayWithAuthors', () => {
	const allAuthors = [
		{ id: '1', name: 'John Doe' },
		{ id: '2', name: 'Jane Smith' },
		{ id: '3', name: 'Bob Johnson' },
	];

	it('should return null if no authors are found', () => {
		const requestedAuthorsIds = ['4', '5', '6'];
		const result = getArrayWithAuthors(allAuthors, requestedAuthorsIds);
		expect(result).toBeNull();
	});

	it('should return an array of authors with matching ids', () => {
		const requestedAuthorsIds = ['1', '3'];
		const result = getArrayWithAuthors(allAuthors, requestedAuthorsIds);
		expect(result).toEqual([
			{ id: '1', name: 'John Doe' },
			{ id: '3', name: 'Bob Johnson' },
		]);
	});
});

describe('getStringWithAuthorsNames', () => {
	const allAuthors = [
		{ id: '1', name: 'John Doe' },
		{ id: '2', name: 'Jane Smith' },
		{ id: '3', name: 'Bob Johnson' },
	];

	it('should return null if no authors are found', () => {
		const requestedAuthorsIds = ['4', '5', '6'];
		const result = getStringWithAuthorsNames(allAuthors, requestedAuthorsIds);
		expect(result).toBeNull();
	});

	it('should return a string of author names separated by commas', () => {
		const requestedAuthorsIds = ['1', '3'];
		const result = getStringWithAuthorsNames(allAuthors, requestedAuthorsIds);
		expect(result).toEqual('John Doe, Bob Johnson');
	});
});
