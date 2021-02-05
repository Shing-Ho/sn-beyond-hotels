import { handleActions } from 'redux-actions';
import adventureActions from 'store/adventure/actions';

export const adventureReducer = handleActions(
  new Map([
    [
      adventureActions.setLoading,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    ],
    [
      adventureActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      adventureActions.setTrips,
      (state, action) => ({
        ...state,
        loading: false,
        trips: action.payload || [],
      }),
    ],
    [
      adventureActions.setCountries,
      (state, action) => ({
        ...state,
        loading: false,
        countries: action.payload || [],
      }),
    ],
    [
      adventureActions.setDestinations,
      (state, action) => ({
        ...state,
        loading: false,
        destinations: action.payload || [],
      }),
    ],
    [
      adventureActions.setTripInfo,
      (state, action) => ({
        ...state,
        loading: false,
        tripInfo: action.payload,
      }),
    ],
    [
      adventureActions.setTripAvailabilities,
      (state, action) => ({
        ...state,
        loading: false,
        tripAvailabilities: action.payload,
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    trips: [],
    countries: [],
    destinations: [],
    tripInfo: null,
    tripAvailabilities: null,
  },
);

export default adventureReducer;
