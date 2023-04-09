import { toastNotify } from './toastNotify';

export type RequestResult = {
	successful: boolean;
	result?: any;
	errors?: string[];
};

export const loginFetchHelper = async (
	email: string,
	password: string
): Promise<RequestResult> => {
	try {
		if (!email || !password) {
			throw new Error('No email or password provided');
		}
		const response = await fetch('http://127.0.0.1:4000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});
		if (!response.ok) {
			throw new Error('🛑 Error during login');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		toastNotify('🛑 Login unsuccessful');
		console.error(error);
		throw error;
	}
};

export const registerFetchHelper = async (
	name: string,
	email: string,
	password: string
): Promise<RequestResult> => {
	try {
		if (!email || !password) {
			throw new Error('No email or password provided');
		}
		const response = await fetch('http://127.0.0.1:4000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name, email, password }),
		});
		if (!response.ok) {
			throw new Error('🛑 Error during registration');
		}
		const data = await response.json();
		return data;
	} catch (error) {
		toastNotify('🛑 Registration unsuccessful');
		console.error(error);
		throw error;
	}
};

export const getAllCoursesHelper = async (): Promise<RequestResult> => {
	try {
		const response = await fetch('http://localhost:4000/courses/all');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Fetch all courses error: ', error);
		throw error;
	}
};

export const getAllAuthorsHelper = async (): Promise<RequestResult> => {
	try {
		const response = await fetch('http://localhost:4000/authors/all');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Fetch all authors error: ', error);
		throw error;
	}
};

export const getUserFetchHelper = async (
	token: string
): Promise<RequestResult> => {
	try {
		if (!token) throw new Error('No token provided');
		//					headers: {
		// Authorization: options.token,
		//	},
		const response = await fetch('http://localhost:4000/users/me', {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Fetch user credentials error: ', error);
		throw error;
	}
};

export const logoutHelper = async (token: string): Promise<RequestResult> => {
	try {
		const response = await fetch('http://localhost:4000/logout', {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});
		if (!response.ok) throw new Error('🛑 Error during logout');
		return { successful: true, result: 'Logout successful' };
	} catch (error) {
		console.error('Fetch user logout error: ', error);
		throw error;
	}
};

export const addNewCourseHelper = async (
	token: string,
	courseToApi: {
		title: string;
		description: string;
		duration: number;
		authors: string[];
	}
): Promise<RequestResult> => {
	try {
		if (!token) throw new Error('No token provided');
		if (!courseToApi) throw new Error('No course provided');
		const response = await fetch('http://localhost:4000/courses', {
			method: 'POST',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(courseToApi),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Fetch course addition error: ', error);
		throw error;
	}
};

export const updateCourseHelper = async (
	token: string,
	courseToApi: {
		title: string;
		description: string;
		duration: number;
		authors: string[];
	},
	courseId: string
): Promise<RequestResult> => {
	try {
		if (!token) throw new Error('No token provided');
		if (!courseToApi) throw new Error('No course provided');
		const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
			method: 'PUT',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(courseToApi),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Fetch course update error: ', error);
		throw error;
	}
};

export const deleteCourseHelper = async (
	token: string,
	courseId: string
): Promise<RequestResult> => {
	try {
		if (!token) throw new Error('No token provided');
		if (!courseId) throw new Error('No course id provided');
		const response = await fetch(`http://localhost:4000/courses/${courseId}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Fetch course deletion error: ', error);
		throw error;
	}
};

export const addNewAuthorHelper = async (
	token: string,
	name: string
): Promise<RequestResult> => {
	try {
		if (!token) throw new Error('No token provided');
		if (!name) throw new Error('No name provided');
		const response = await fetch('http://localhost:4000/authors/add', {
			method: 'POST',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Fetch author addition error: ', error);
		throw error;
	}
};
