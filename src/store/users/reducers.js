import { handleActions } from 'redux-actions';
import userActions from './node_modules/store/users/actions';

export const userReducer = handleActions(
  new Map([
    [
      userActions.setLoading,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    ],
    [
      userActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      userActions.setUsers,
      (state, action) => ({
        ...state,
        loading: false,
        users: action.payload,
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    users: null,
  },
);

export default userReducer;
