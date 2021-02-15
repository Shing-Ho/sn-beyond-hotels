import { handleActions } from 'redux-actions';
import diningActions from 'store/dining/actions';

export const diningReducer = handleActions(
  new Map([
    [
      diningActions.setLoading,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    ],
    [
      diningActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      diningActions.setDinings,
      (state, action) => ({
        ...state,
        loading: false,
        dinings: action.payload || [],
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    dinings: [],
  },
);

export default diningReducer;
