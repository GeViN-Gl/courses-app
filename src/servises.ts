import {
	FailedRequest,
	SuccessfulRequest,
	fetchRequest,
	isFetchSuccess,
} from './helpers/dataFetchers';

//expected types
import { Course } from './store/courses/reducer';
import { Author } from './store/authors/reducer';

export type SuccessfullAuthorRequest = {
	successful: boolean;
	result: Author[];
};
export type SuccessfullCourseRequest = {
	successful: boolean;
	result: Course[];
};

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
		!data?.authors.every((author: any) => typeof author === 'string')
	)
		return false;
	return true;
};

const isExpectedAuthorData = (data: any): data is Author => {
	if (typeof data.id !== 'string' || typeof data.name !== 'string')
		return false;
	return true;
};

//assertion functions
function assertAuthorsResponce(
	data: SuccessfulRequest | FailedRequest
): asserts data is SuccessfullAuthorRequest {
	if (!isFetchSuccess(data)) {
		// if there is error message in result
		if (data.result) {
			throw new Error(`🛑 Errors: ${data.result}`);
		}
		// if there is error message in errors array
		if (data.errors) {
			throw new Error(`🛑 Errors: ${data.errors.join(', ')}`);
		}
		// if there is no error message but success is false
		throw new Error('🛑 Error during fetching authors');
	}
	if (isFetchSuccess(data)) {
		if (!Array.isArray(data.result)) {
			throw new Error('🛑 Error in returned object');
		}
		if (!data.result.every((data) => isExpectedAuthorData(data))) {
			throw new Error('🛑 Error in returned object');
		}
	}
}

function assertCoursesResponce(
	data: SuccessfulRequest | FailedRequest
): asserts data is SuccessfullCourseRequest {
	if (!isFetchSuccess(data)) {
		// if there is error message in result
		if (data.result) {
			throw new Error(`🛑 Errors: ${data.result}`);
		}
		// if there is error message in errors array
		if (data.errors) {
			throw new Error(`🛑 Errors: ${data.errors.join(', ')}`);
		}
		// if there is no error message but success is false
		throw new Error('🛑 Error during fetching courses');
	}
	if (isFetchSuccess(data)) {
		// if there ia a success in fetch but result has wrong type
		// it must be array of courses
		if (!Array.isArray(data.result)) {
			throw new Error('🛑 Error in returned object');
		}
		if (!data.result.every((data) => isExpectedCourseData(data))) {
			throw new Error('🛑 Error in returned object');
		}
	}
}

// fetching functions
export const getAllCoursesFromAPI = async (): Promise<
	SuccessfullCourseRequest | FailedRequest
> => {
	try {
		const data = await fetchRequest('http://localhost:4000/courses/all');
		// errors
		assertCoursesResponce(data);
		// all Ok
		return data;
	} catch (error) {
		console.error(error);
	}
	return { successful: false, result: '🛑 Error during fetching courses' };
};

export const getAllAuthorsFromAPI = async (): Promise<
	SuccessfullAuthorRequest | FailedRequest
> => {
	try {
		const data = await fetchRequest('http://localhost:4000/authors/all');
		// errors
		assertAuthorsResponce(data);
		// all Ok
		return data;
	} catch (error) {
		console.error(error);
	}
	return {
		successful: false,
		result: '🛑 Error during fetching authors',
	};
};
