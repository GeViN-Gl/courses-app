import {
	compose,
	legacy_createStore as createStore,
	applyMiddleware,
	Middleware,
} from 'redux';
import thunk from 'redux-thunk';

import { loggerMiddleware } from './logger';

import { rootReducer } from './root-reducer';

export type RootState = ReturnType<typeof rootReducer>;

const middleWares = [
	process.env.NODE_ENV !== 'production' && loggerMiddleware,
	thunk,
].filter((middleware): middleware is Middleware => Boolean(middleware));

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
