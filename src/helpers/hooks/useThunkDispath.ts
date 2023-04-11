import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';

export const useThunkDispatch = () =>
	useDispatch<ThunkDispatch<{}, {}, AnyAction>>();
