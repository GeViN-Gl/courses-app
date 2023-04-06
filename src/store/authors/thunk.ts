import { ThunkDispatch } from 'redux-thunk';
import { getAllAuthorsFromAPI } from '../../servises';
import {
	fetchAuthorsFailure,
	fetchAuthorsStart,
	fetchAuthorsSuccess,
} from './actionCreators';
import { AnyAction } from 'redux';

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

			dispatch(fetchAuthorsSuccess(data.result));
		} catch (error) {
			dispatch(fetchAuthorsFailure(error as Error));
		}
	};
};
