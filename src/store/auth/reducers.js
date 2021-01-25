import { handleActions } from 'redux-actions';
import authActions from 'store/auth/actions';

export const authReducer = handleActions(
  new Map([
    [
      authActions.setLoading,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    ],
    [
      authActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      authActions.setToken,
      (state, action) => ({
        ...state,
        loading: false,
        token: action.payload,
      }),
    ],
    [
      authActions.setUser,
      (state, action) => ({
        ...state,
        loading: false,
        user: action.payload,
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    token: null,
    user: null,
  },
);

export default authReducer;
