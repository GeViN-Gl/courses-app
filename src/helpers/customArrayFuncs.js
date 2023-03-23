/**
 * Returns an array of author objects that match the given IDs.
 *
 * @param {Object[]} allAuthors - An array of author objects.
 * @param {number[]} authorsIds - An array of author IDs to search for.
 *
 * @returns {Object[]} - An array of author objects that match the given IDs.
 */
export const getArrayWithAuthors = (allAuthors, authorsIds) => {
	return authorsIds
		.map((authorId) => allAuthors.find((authObj) => authObj.id === authorId))
		.filter((res) => res !== undefined);
};
