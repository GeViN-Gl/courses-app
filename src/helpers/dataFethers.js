export const postData = async (url, postData) => {
	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(postData),
		});
		const responcedData = await response.json();
		// error handling
		// Back answers differently for different requests.
		// For login - an error in the status
		// For registration - an error in the array
		if (!responcedData.successful || !response.ok) {
			if (responcedData.errors) {
				throw new Error(
					`Fetch error. Reason(s): ${responcedData.errors.join(', ')}`
				);
			}
			if (responcedData.result) {
				throw new Error(`Fetch error. Reason: ${responcedData.result}`);
			}
			throw new Error(`Fetch error. Reason: ${response.status}`);
		}
		// all ok
		if (responcedData.successful) {
			return responcedData;
		}
	} catch (error) {
		return { successful: false, error };
	}
};
