import {
	FETCH_ACTION_TYPES,
	FailedRequest,
	SuccessfulRequest,
	fetchRequest,
	isFetchSuccess,
	FetchRequestOptions,
} from './helpers/dataFetchers';

//expected types
import { Course } from './store/courses/reducer';
import { Author } from './store/authors/reducer';
import { User } from './store/user/reducer';

export type SuccessfullAuthorRequest = {
	successful: boolean;
	result: Author[];
};
export type SuccessfullCourseRequest = {
	successful: boolean;
	result: Course[];
};
export type SuccessfullUserRequest = {
	successful: boolean;
	result: User;
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

const isExpectedUserData = (data: any): data is User => {
	if (typeof data.email !== 'string' || typeof data.role !== 'string')
		return false;
	if (typeof data.name !== 'string' && data.name !== null) return false;
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

function assertUserResponce(
	data: SuccessfulRequest | FailedRequest
): asserts data is SuccessfullUserRequest {
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
		throw new Error('🛑 Error during fetching user');
	}
	if (isFetchSuccess(data)) {
		// if there ia a success in fetch but result has wrong type
		// it must be array of courses
		if (!isExpectedUserData(data.result)) {
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
		// rethrow error to be able to catch it in thunk
		throw error;
	}
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
		// rethrow error to be able to catch it in thunk
		throw error;
	}
};

export const getUserFromAPI = async (
	token: string
): Promise<SuccessfullUserRequest | FailedRequest> => {
	try {
		const fetchOptions: FetchRequestOptions = {
			token,
		};
		const data = await fetchRequest(
			'http://localhost:4000/users/me',
			FETCH_ACTION_TYPES.GET_WITH_AUTH,
			fetchOptions
		);
		// errors
		assertUserResponce(data);
		// all Ok
		return data;
	} catch (error) {
		console.error(error);
		// rethrow error to be able to catch it in thunk
		throw error;
	}
};
