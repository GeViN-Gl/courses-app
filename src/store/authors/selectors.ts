import { RootState } from '../store';

export const selectAuthorsList = (state: RootState) =>
	state.authors.authorsList;
