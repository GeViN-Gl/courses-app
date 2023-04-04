export enum FETCH_ACTION_TYPES {
	GET = 'get',
	POST = 'post',
}

export type QueryParams = {
	[key: string]: string;
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

export const fetchRequest = async (
	url: string,
	action: FETCH_ACTION_TYPES = FETCH_ACTION_TYPES.GET,
	postData?: QueryParams
): Promise<SuccessfulRequest | FailedRequest> => {
	try {
		let request: Request;
		if (action === FETCH_ACTION_TYPES.POST) {
			request = new Request(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postData),
			});
		} else {
			//action === FETCH_ACTION_TYPES.GET
			request = new Request(url);
		}

		const response = await fetch(request);
		const responcedData: SuccessfulRequest | FailedRequest =
			await response.json();

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
