import { handleActions } from 'redux-actions';
import careyActions from 'store/carey/actions';

export const careyReducer = handleActions(
  new Map([
    [
      careyActions.setLoading,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    ],
    [
      careyActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      careyActions.getCareyRateInquiry,
      (state, action) => ({
        ...state,
        loading: false,
        careyRateInquiry: action.payload || [],
      }),
    ],
    [
      careyActions.clearState,
      (state) => ({
        ...state,
        careyRateInquiry: [],
        loading: false,
        error: '',
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    careyRateInquiry: [],
  },
);

export default careyReducer;
