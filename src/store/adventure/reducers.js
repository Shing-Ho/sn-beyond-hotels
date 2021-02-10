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
      adventureActions.setBookingError,
      (state, action) => ({
        ...state,
        loading: false,
        bookingError: action.payload,
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
      adventureActions.setStandardCountries,
      (state, action) => ({
        ...state,
        loading: false,
        standardCountries: action.payload || [],
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
      adventureActions.setBookInfo,
      (state, action) => ({
        ...state,
        loading: false,
        bookInfo: action.payload,
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
    bookingError: null,
    trips: [],
    countries: [],
    standardCountries: [],
    destinations: [],
    tripInfo: null,
    bookInfo: null,
    tripAvailabilities: null,
  },
);

export default adventureReducer;
