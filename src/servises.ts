//expected types
import { Course } from './store/courses/reducer';
import { Author } from './store/authors/reducer';
import { User } from './store/user/reducer';
import {
	RequestResult,
	addNewAuthorHelper,
	addNewCourseHelper,
	deleteCourseHelper,
	getAllAuthorsHelper,
	getAllCoursesHelper,
	getUserFetchHelper,
	logoutHelper,
	updateCourseHelper,
} from './helpers/fetchHelpers';

interface SuccessfulResponseBase {
	successful: boolean;
	result?: any;
}

interface SuccessfulAddOrUpdateCourseResponse extends SuccessfulResponseBase {
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
	? SuccessfulAddOrUpdateCourseResponse
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
	data: RequestResult,
	errorPrefix: string
): asserts data is SuccessfulResponse<T> {
	if (!data.successful) {
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
			const responcedData = await getAllCoursesHelper();
			assertSuccessfulResponse<Course[]>(responcedData, 'Courses'); // errors
			return responcedData; // all Ok
		} catch (error) {
			console.error(error);
			throw error; // rethrow error to be able to catch it in thunk
		}
	};

export const getAllAuthorsFromAPI =
	async (): Promise<SuccessfulAuthorResponse> => {
		try {
			const responcedData = await getAllAuthorsHelper();
			assertSuccessfulResponse<Author[]>(responcedData, 'Authors'); // errors
			return responcedData; // all Ok
		} catch (error) {
			console.error(error);
			throw error; // rethrow error to be able to catch it in thunk
		}
	};

export const getUserFromAPI = async (
	token: string
): Promise<SuccessfulUserResponse> => {
	try {
		const responcedData = await getUserFetchHelper(token);
		assertSuccessfulResponse<User>(responcedData, 'User'); // errors
		return responcedData; // all Ok
	} catch (error) {
		console.error(error);
		throw error; // rethrow error to be able to catch it in thunk
	}
};

export const logoutUserFromAPI = async (
	token: string
): Promise<SuccessfulLogoutResponse> => {
	try {
		const responcedData = await logoutHelper(token);
		if (!responcedData.successful) {
			throw new Error('🛑 Error during logout');
		}
		return responcedData as SuccessfulLogoutResponse;
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
): Promise<SuccessfulAddOrUpdateCourseResponse> => {
	try {
		const responcedData = await addNewCourseHelper(token, courseToApi);
		assertSuccessfulResponse<Course>(responcedData, 'Course');
		return responcedData;
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
): Promise<SuccessfulAddOrUpdateCourseResponse> => {
	try {
		const responcedData = await updateCourseHelper(
			token,
			courseToApi,
			courseId
		);
		assertSuccessfulResponse<Course>(responcedData, 'Course');
		return responcedData;
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
		const data = await deleteCourseHelper(token, courseId);
		if (!data.successful) {
			throw new Error('🛑 Error during course deletion');
		}
		return data as SuccessfulDeleteCourseResponse;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const sendNewAuthorToAPI = async (
	token: string,
	name: string
): Promise<SuccessfulAddAuthorResponse> => {
	try {
		const responcedData = await addNewAuthorHelper(token, name);
		assertSuccessfulResponse<Author>(responcedData, 'Author');
		return responcedData;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
