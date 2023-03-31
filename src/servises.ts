import { fetchRequest, isFetchSuccess } from './helpers/dataFetchers';

//expected types
import { Course } from './store/courses/reducer';
import { Author } from './store/authors/reducer';
//type guards

const isExpectedCourseData = (data: any): data is Course => {
	if (
		typeof data.id !== 'string' ||
		typeof data.title !== 'string' ||
		typeof data.description !== 'string' ||
		typeof data.creationDate !== 'string' ||
		typeof data.duration !== 'number' ||
		typeof data.authors !== `object`
	)
		return false;
	if (
		!Array.isArray(data.authors) ||
		!data.authors.every((author: any) => typeof author === 'string')
	)
		return false;
	return true;
};

const isExpectedAuthorData = (data: any): data is Author => {
	if (typeof data.id !== 'string' || typeof data.name !== 'string')
		return false;
	return true;
};

export const getAllCoursesFromAPI = async () => {
	try {
		const data = await fetchRequest('http://localhost:4000/courses/all');
		// all Ok
		if (isFetchSuccess(data)) {
			console.log('🟢 Fetch all courses - success');
			return data;
		}
		// errors
		if (!isFetchSuccess(data)) {
			if (
				Array.isArray(data.result) &&
				!data.result.every((data) => isExpectedCourseData(data))
			) {
				throw new Error('🛑 Error in returned object');
			}
			if (data.errors) {
				throw new Error(`🛑 Errors: ${data.errors.join(', ')}`);
			}
			if (data.result) {
				throw new Error(`🛑 Errors: ${data.result}`);
			}
			throw new Error(`🛑 Error while fetching all courses`);
		}
	} catch (error) {
		console.error(`Error while fetching all courses: ${error}`);
	}
	return { successful: false, result: 'Error while fetching all courses' };
};

export const getAllAuthorsFromAPI = async () => {
	try {
		const data = await fetchRequest('http://localhost:4000/authors/all');
		// all Ok
		if (isFetchSuccess(data)) {
			console.log('🟢 Fetch all authors - success');
			return data;
		}
		// errors
		if (!isFetchSuccess(data)) {
			if (
				Array.isArray(data.result) &&
				!data.result.every((data) => isExpectedAuthorData(data))
			) {
				throw new Error('🛑 Error in returned object');
			}
			if (!data.successful && data.errors) {
				throw new Error(`🛑 Errors: ${data.errors.join(', ')}`);
			}
			if (!data.successful && data.result) {
				throw new Error(`🛑 Errors: ${data.result}`);
			}
			if (!data.successful) {
				throw new Error(`🛑 Error while fetching all authors`);
			}
		}
	} catch (error) {
		console.error(`Error while fetching all authors: ${error}`);
	}
	return { successful: false, result: 'Error while fetching all authors' };
};
