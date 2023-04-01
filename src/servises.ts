import {
	FailedRequest,
	SuccessfulRequest,
	fetchRequest,
	isFetchSuccess,
} from './helpers/dataFetchers';

//expected types
import { Course } from './store/courses/reducer';
import { Author } from './store/authors/reducer';

export type SuccessfulAuthorRequest = {
	successful: boolean;
	result: Author[];
};
export type SuccessfulCourseRequest = {
	successful: boolean;
	result: Course[];
};

//type guards
// Need to ask, mb makes sence instead of type guards to use asserions?

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

export const isCoursesFetchSuccess = (
	data: SuccessfulRequest | FailedRequest
): data is SuccessfulCourseRequest => {
	if (!isFetchSuccess(data)) return false;
	if (data.result.every((data: object) => isExpectedCourseData(data)))
		return true;
	return false;
};

const isExpectedAuthorData = (data: any): data is Author => {
	if (typeof data.id !== 'string' || typeof data.name !== 'string')
		return false;
	return true;
};

export const isAuthorsFetchSuccess = (
	data: SuccessfulRequest | FailedRequest
): data is SuccessfulAuthorRequest => {
	if (!isFetchSuccess(data)) return false;
	if (data.result.every((data: object) => isExpectedAuthorData(data)))
		return true;
	return false;
};

export const getAllCoursesFromAPI = async (): Promise<
	SuccessfulCourseRequest | FailedRequest
> => {
	try {
		const data = await fetchRequest('http://localhost:4000/courses/all');

		// errors
		if (!isFetchSuccess(data)) {
			if (!Array.isArray(data.result)) {
				throw new Error('🛑 Error in returned object');
			}
			if (!data.result.every((data) => isExpectedCourseData(data))) {
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

		// all Ok
		if (isFetchSuccess(data)) {
			return data as SuccessfulCourseRequest;
		}
	} catch (error) {
		console.error(`Error while fetching all courses: ${error}`);
	}
	return { successful: false, result: 'Error while fetching all courses' };
};

export const getAllAuthorsFromAPI = async (): Promise<
	SuccessfulAuthorRequest | FailedRequest
> => {
	try {
		const data = await fetchRequest('http://localhost:4000/authors/all');
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

		// all Ok
		if (isFetchSuccess(data)) {
			return data as SuccessfulAuthorRequest;
		}
	} catch (error) {
		console.error(`Error while fetching all authors: ${error}`);
	}
	return { successful: false, result: 'Error while fetching all authors' };
};
