import { handleActions } from 'redux-actions';
import adminActions from 'store/admin/actions';

export const adminReducer = handleActions(
  new Map([
    [
      adminActions.setLoading,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    ],
    [
      adminActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      adminActions.setUsers,
      (state, action) => ({
        ...state,
        loading: false,
        users: action.payload,
      }),
    ],
    [
      adminActions.setUser,
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
    users: null,
  },
);

export default adminReducer;
