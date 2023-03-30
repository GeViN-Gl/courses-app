import { AnyAction } from 'redux';

// a brain-blowing idea taken from Udemy,
// the withMatcher function returns an ActionCreator function, but since the function is actually an object
// we add to ActionCreator property 'type' that is the result of running the ActionCreator (we always pass to it actionType object with (type, ?payload)
// and add a match method that will work as a Type Guard narrowing the types of passed ActionTypes

// Define a type for a matchable action creator
type Matchable<AC extends () => AnyAction> = AC & {
	// The type property is the type of the action
	type: ReturnType<AC>['type'];
	// The match method is a type guard that checks if an action has the same type
	match(action: AnyAction): action is ReturnType<AC>;
};

// Define an overloaded function for creating a matchable action creator
export function withMatcher<AC extends () => AnyAction & { type: string }>(
	actionCreator: AC
): Matchable<AC>;
export function withMatcher<
	AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

export function withMatcher(actionCreator: Function) {
	const type = actionCreator().type;
	return Object.assign(actionCreator, {
		type,
		match(action: AnyAction) {
			return action.type === type;
		},
	});
}

// Define a type for a Redux action with a payload
export type ActionWithPayload<T, P> = {
	type: T;
	payload: P;
};
// Define a type for a Redux action without a payload
export type Action<T> = {
	type: T;
};

// Define an overloaded function for creating a Redux action with a payload
export function createAction<T extends string, P>(
	type: T,
	payload: P
): ActionWithPayload<T, P>;
// Define an overloaded function for creating a Redux action without a payload
export function createAction<T extends string>(
	type: T,
	payload: void
): Action<T>;
// overloaded function
export function createAction<T extends string, P>(type: T, payload: P) {
	return { type, payload };
}
