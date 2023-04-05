import { RootState } from '../store';

export const selectCurrentUserIsAuth = (state: RootState) => state.user.isAuth;
export const selectCurrentUserName = (state: RootState) => state.user.name;
export const selectCurrentUserEmail = (state: RootState) => state.user.email;
export const selectCurrentUserToken = (state: RootState) => state.user.token;
export const selectCurrentUserRole = (state: RootState) => state.user.role;
