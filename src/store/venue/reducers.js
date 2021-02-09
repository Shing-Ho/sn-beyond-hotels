import { handleActions } from 'redux-actions';
import venueActions from 'store/venue/actions';

export const venueReducer = handleActions(
  new Map([
    [
      venueActions.setLoading,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    ],
    [
      venueActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      venueActions.setVenues,
      (state, action) => ({
        ...state,
        loading: false,
        venues: action.payload,
      }),
    ],
    [
      venueActions.setVenue,
      (state, action) => ({
        ...state,
        loading: false,
        venue: action.payload,
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    venues: null,
    venue: null,
  },
);

export default venueReducer;
