import { ThunkDispatch } from 'redux-thunk';
import { FailedRequest } from '../../helpers/dataFetchers';
import { SuccessfullAuthorRequest, getAllAuthorsFromAPI } from '../../servises';
import {
	fetchAuthorsFailure,
	fetchAuthorsStart,
	fetchAuthorsSuccess,
} from './actionCreators';
import { AnyAction } from 'redux';

function assertAuthorsResponce(
	data: SuccessfullAuthorRequest | FailedRequest
): asserts data is SuccessfullAuthorRequest {
	if (!data.successful) {
		throw new Error(`${data.result}`);
	}
}

// TODO: mayby add stronger types
// {} specifies the type of the Redux state object
// {} specifies any extra arguments that can be passed to the thunk function
// which we don't use
// And return type of async thunk function is : ThunkAction<void, {}, {}, Action<string>>
// but we don't need to specify it because we use ThunkDispatch

export const fetchAuthorsAsync = () => {
	return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
		dispatch(fetchAuthorsStart());
		try {
			const data = await getAllAuthorsFromAPI();
			assertAuthorsResponce(data);
			dispatch(fetchAuthorsSuccess(data.result));
		} catch (error) {
			dispatch(fetchAuthorsFailure(error as Error));
		}
	};
};
