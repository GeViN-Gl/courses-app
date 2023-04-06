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

interface SuccessfulResponseBase {
	successful: boolean;
	result?: any;
}

interface SuccessfulAddOrPutCourseResponse extends SuccessfulResponseBase {
	result: Course;
}
interface SuccessfulAddAuthorResponse extends SuccessfulResponseBase {
	result: Author;
}
interface SuccessfulCourseResponse extends SuccessfulResponseBase {
	result: Course[];
}
interface SuccessfulAuthorResponse extends SuccessfulResponseBase {
	result: Author[];
}
interface SuccessfulUserResponse extends SuccessfulResponseBase {
	result: User;
}
//
interface SuccessfulLogoutResponse extends SuccessfulResponseBase {
	result: string;
}
interface SuccessfulDeleteCourseResponse extends SuccessfulResponseBase {
	result: string;
}

// First Author and Course, because they are more specific than arrays
type SuccessfulResponse<T> = T extends Course
	? SuccessfulAddOrPutCourseResponse
	: T extends Author
	? SuccessfulAddAuthorResponse
	: T extends Course[]
	? SuccessfulCourseResponse
	: T extends Author[]
	? SuccessfulAuthorResponse
	: T extends User
	? SuccessfulUserResponse
	: never;

//assertion functions
//
function assertSuccessfulResponse<T>(
	data: SuccessfulRequest | FailedRequest,
	errorPrefix: string
): asserts data is SuccessfulResponse<T> {
	if (!isFetchSuccess(data)) {
		// if there is error message in result
		if (data.result) {
			throw new Error(`🛑 ${errorPrefix} Error: ${data.result}`);
		}
		// if there is error message in errors array
		if (data.errors) {
			throw new Error(`🛑 ${errorPrefix} Errors: ${data.errors.join(', ')}`);
		}
		// if there is no error message but success is false
		throw new Error(`🛑 Error during fetching ${errorPrefix.toLowerCase()}`);
	}
}

// fetching functions
export const getAllCoursesFromAPI =
	async (): Promise<SuccessfulCourseResponse> => {
		try {
			const data = await fetchRequest('http://localhost:4000/courses/all');
			// errors
			assertSuccessfulResponse<Course[]>(data, 'Courses');
			// all Ok
			return data;
		} catch (error) {
			console.error(error);
			// rethrow error to be able to catch it in thunk
			throw error;
		}
	};

export const getAllAuthorsFromAPI =
	async (): Promise<SuccessfulAuthorResponse> => {
		try {
			const data = await fetchRequest('http://localhost:4000/authors/all');
			// errors
			assertSuccessfulResponse<Author[]>(data, 'Authors');
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
): Promise<SuccessfulUserResponse> => {
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
		assertSuccessfulResponse<User>(data, 'User');
		// all Ok
		return data;
	} catch (error) {
		console.error(error);
		// rethrow error to be able to catch it in thunk
		throw error;
	}
};

export const logoutUserFromAPI = async (
	token: string
): Promise<SuccessfulLogoutResponse> => {
	try {
		const fetchOptions: FetchRequestOptions = {
			token,
		};
		const data = await fetchRequest(
			'http://localhost:4000/logout',
			FETCH_ACTION_TYPES.LOGOUT,
			fetchOptions
		);
		if (!isFetchSuccess(data)) {
			throw new Error('🛑 Error during logout');
		}
		return data as SuccessfulLogoutResponse;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const sendNewCourseToAPI = async (
	token: string,
	courseToApi: {
		title: string;
		description: string;
		duration: number;
		authors: string[];
	}
): Promise<SuccessfulAddOrPutCourseResponse> => {
	// /courses/add
	try {
		const fetchOptions: FetchRequestOptions = {
			token,
			queryData: courseToApi,
		};
		const data = await fetchRequest(
			'http://localhost:4000/courses/add',
			FETCH_ACTION_TYPES.ADD_NEW_COURSE,
			fetchOptions
		);
		assertSuccessfulResponse<Course>(data, 'Course');
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const sendUpdatedCourseToAPI = async (
	token: string,
	courseToApi: {
		title: string;
		description: string;
		duration: number;
		authors: string[];
	},
	courseId: string
): Promise<SuccessfulAddOrPutCourseResponse> => {
	// /courses/update
	try {
		const fetchOptions: FetchRequestOptions = {
			token,
			queryData: courseToApi,
		};
		const data = await fetchRequest(
			`http://localhost:4000/courses/${courseId}`,
			FETCH_ACTION_TYPES.UPDATE_COURSE,
			fetchOptions
		);
		assertSuccessfulResponse<Course>(data, 'Course');
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const sendNewAuthorToAPI = async (
	token: string,
	name: string
): Promise<SuccessfulAddAuthorResponse> => {
	// /authors/add
	try {
		const fetchOptions: FetchRequestOptions = {
			token,
			queryData: {
				name,
			},
		};
		const data = await fetchRequest(
			'http://localhost:4000/authors/add',
			FETCH_ACTION_TYPES.ADD_NEW_AUTHOR,
			fetchOptions
		);
		assertSuccessfulResponse<Author>(data, 'Author');
		return data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const deleteCourseFromAPI = async (
	token: string,
	courseId: string
): Promise<SuccessfulDeleteCourseResponse> => {
	try {
		const fetchOptions: FetchRequestOptions = {
			token,
		};
		const data = await fetchRequest(
			`http://localhost:4000/courses/${courseId}`,
			FETCH_ACTION_TYPES.DELETE_COURSE,
			fetchOptions
		);
		if (!isFetchSuccess(data)) {
			throw new Error('🛑 Error during course deletion');
		}
		return data as SuccessfulDeleteCourseResponse;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
