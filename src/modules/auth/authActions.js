import { createAsyncActions } from '@letapp/redux-actions';

export const login = createAsyncActions('auth/login');
export const register = createAsyncActions('auth/register');
