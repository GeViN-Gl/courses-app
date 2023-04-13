import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

const middleWares = [thunk];

export const mockStore = (state = {}) => {
	return createStore(rootReducer, state, applyMiddleware(...middleWares));
};
