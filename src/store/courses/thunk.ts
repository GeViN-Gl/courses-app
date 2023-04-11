import { ThunkDispatch } from 'redux-thunk';
import { getAllCoursesFromAPI } from '../../servises';
import {
	fetchCoursesStart,
	fetchCoursesSuccess,
	fetchCoursesFailure,
} from './actionCreators';
import { AnyAction } from 'redux';

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

			dispatch(fetchCoursesSuccess(data.result));
		} catch (error) {
			dispatch(fetchCoursesFailure(error as Error));
		}
	};
};
