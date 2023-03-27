import { AnyAction } from 'redux';

// a brain-blowing idea taken from Udemy,
// the withMatcher function returns an ActionCreator function, but since the function is actually an object
// we add to ActionCreator property 'type' that is the result of running the ActionCreator (we always pass to it actionType object with (type, ?payload)
// and add a match method that will work as a Type Guard narrowing the types of passed ActionTypes
type Matchable<AC extends () => AnyAction> = AC & {
	type: ReturnType<AC>['type'];
	match(action: AnyAction): action is ReturnType<AC>;
};

// prettier-ignore
export function withMatcher<AC extends () 							=> AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;
// prettier-ignore
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
	const type = actionCreator().type;
	return Object.assign(actionCreator, {
		type,
		match(action: AnyAction) {
			return action.type === type;
		},
	});
}

export type ActionWithPayload<T, P> = {
	type: T;
	payload: P;
};

export type Action<T> = {
	type: T;
};

// overload signature
// prettier-ignore
export function createAction<T extends string, P>(type: T, payload: P   ): ActionWithPayload<T, P>;
// prettier-ignore
export function createAction<T extends string>   (type: T, payload: void): Action<T>;
// overloaded function
export function createAction<T extends string, P>(type: T, payload: P) {
	return { type, payload };
}
