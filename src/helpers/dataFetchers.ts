export enum FETCH_ACTION_TYPES {
	GET = 'GET',
	POST = 'POST',
	GET_WITH_AUTH = 'GET_WITH_AUTH',
	DELETE = 'DELETE',
	ADD_NEW_COURSE = 'ADD_NEW_COURSE',
	ADD_NEW_AUTHOR = 'ADD_NEW_AUTHOR',
	UPDATE_COURSE = 'UPDATE_COURSE',
}

export type QueryParams = {
	[key: string]: string | string[] | number;
};

export type SuccessfulRequest = {
	successful: boolean;
	result: any;
	user?: {
		email: string;
		name: string;
	};
};

export type FailedRequest = {
	successful: false;
	result?: string;
	errors?: string[];
};

// TG success
export const isFetchSuccess = (data: any): data is SuccessfulRequest =>
	data.successful === true;

export type FetchRequestOptions = {
	queryData?: QueryParams;
	token?: string;
};

export const fetchRequest = async (
	url: string,
	action: FETCH_ACTION_TYPES = FETCH_ACTION_TYPES.GET,
	options: FetchRequestOptions = {}
): Promise<SuccessfulRequest | FailedRequest> => {
	try {
		let request: Request;

		switch (action) {
			case FETCH_ACTION_TYPES.GET:
				request = new Request(url);
				break;

			case FETCH_ACTION_TYPES.POST:
				if (!options.queryData) {
					throw new Error('No query data provided');
				}
				request = new Request(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(options.queryData),
				});
				break;

			case FETCH_ACTION_TYPES.GET_WITH_AUTH:
				if (!options.token) {
					throw new Error('No token provided');
				}
				request = new Request(url, {
					headers: {
						Authorization: options.token,
					},
				});
				break;
			case FETCH_ACTION_TYPES.DELETE:
				if (!options.token) {
					throw new Error('No token provided');
				}
				request = new Request(url, {
					method: 'DELETE',
					headers: {
						Authorization: options.token,
					},
				});
				break;
			case FETCH_ACTION_TYPES.ADD_NEW_AUTHOR:
			case FETCH_ACTION_TYPES.ADD_NEW_COURSE:
				if (!options.queryData || !options.token) {
					throw new Error('No query data or token provided');
				}
				request = new Request(url, {
					method: 'POST',
					headers: {
						Authorization: options.token,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(options.queryData),
				});
				break;
			case FETCH_ACTION_TYPES.UPDATE_COURSE:
				if (!options.queryData || !options.token) {
					throw new Error('No query data or token provided');
				}
				request = new Request(url, {
					method: 'PUT',
					headers: {
						Authorization: options.token,
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(options.queryData),
				});
				break;

			default: //GET
				request = new Request(url);
				break;
		}

		const response = await fetch(request);
		// console.log('response:', response);
		// Logout bechaivour is strange, it returns 200 and successful: false
		// so i handle it here separately
		if (response.ok && action === FETCH_ACTION_TYPES.DELETE) {
			return {
				successful: true,
				result: 'Logout successful',
			} as SuccessfulRequest;
		}
		// -------
		const responcedData: SuccessfulRequest | FailedRequest =
			await response.json();
		// console.log('responcedData:', responcedData);

		// errors handling
		if (!isFetchSuccess(responcedData)) {
			if (responcedData.result) {
				return { successful: false, result: responcedData.result };
			}
			if (responcedData.errors) {
				return { successful: false, errors: responcedData.errors };
			}
		}
		if (!response.ok) {
			throw new Error(`Fetch error. Reason: ${response.status}`);
		}

		// all ok
		if (isFetchSuccess(responcedData)) {
			return responcedData;
		}
	} catch (error) {
		return { successful: false, result: error };
	}
	return { successful: false };
};
