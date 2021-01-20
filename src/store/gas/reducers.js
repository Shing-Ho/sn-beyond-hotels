import { handleActions } from 'redux-actions';
import gasActions from 'store/gas/actions';

export const gasReducer = handleActions(
  new Map([
    [
      gasActions.setLoading,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    ],
    [
      gasActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      gasActions.setGasStations,
      (state, action) => ({
        ...state,
        loading: false,
        gasStations: action.payload || [],
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    gasStations: [],
  },
);

export default gasReducer;
