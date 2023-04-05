import { ThunkDispatch } from 'redux-thunk';
import { FailedRequest } from '../../helpers/dataFetchers';
import { SuccessfullCourseRequest, getAllCoursesFromAPI } from '../../servises';
import {
	fetchCoursesStart,
	fetchCoursesSuccess,
	fetchCoursesFailure,
} from './actionCreators';
import { AnyAction } from 'redux';

function assertCoursesResponce(
	data: SuccessfullCourseRequest | FailedRequest
): asserts data is SuccessfullCourseRequest {
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

export const fetchCoursesAsync = () => {
	return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
		dispatch(fetchCoursesStart());
		try {
			const data = await getAllCoursesFromAPI();
			assertCoursesResponce(data);
			dispatch(fetchCoursesSuccess(data.result));
		} catch (error) {
			dispatch(fetchCoursesFailure(error as Error));
		}
	};
};
