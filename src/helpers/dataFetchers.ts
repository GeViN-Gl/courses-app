export type PostDataFetchResponce = {
	successful: boolean;
	result?: string;
	errors?: string[];
	user?: {
		email: string;
		name: string;
	};
};

export const postData = async (
	url: string,
	postData: Record<string, any>
): Promise<PostDataFetchResponce> => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(postData),
		});
		const responcedData: PostDataFetchResponce = await response.json();
		// error handling

		if (!responcedData.successful || !response.ok) {
			if (responcedData.errors) {
				return { successful: false, errors: responcedData.errors };
			}
			if (responcedData.result) {
				return { successful: false, result: responcedData.result };
			}
			throw new Error(`Fetch error. Reason: ${response.status}`);
		}
		// all ok
		if (responcedData.successful && responcedData.result) {
			return responcedData;
		}
	} catch {
		return { successful: false };
	}
	return { successful: false };
};
