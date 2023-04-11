import { ThunkDispatch } from 'redux-thunk';
import { getUserFromAPI } from '../../servises';
import {
	fetchUserStart,
	fetchUserSuccess,
	fetchUserFailure,
} from './actionCreators';
import { AnyAction } from 'redux';

// Mayby add stronger types
// {} specifies the type of the Redux state object
// {} specifies any extra arguments that can be passed to the thunk function
// which we don't use
// And return type of async thunk function is : ThunkAction<void, {}, {}, Action<string>>
// but we don't need to specify it because we use ThunkDispatch

export const fetchUserAsync = (token: string) => {
	return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
		dispatch(fetchUserStart());
		try {
			const data = await getUserFromAPI(token);

			dispatch(fetchUserSuccess(data.result));
		} catch (error) {
			dispatch(fetchUserFailure(error as Error));
		}
	};
};
