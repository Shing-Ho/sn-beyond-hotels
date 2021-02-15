import { handleActions } from 'redux-actions';
import venueActions from 'store/venue/actions';

export const venueReducer = handleActions(
  new Map([
    [
      venueActions.setLoading,
      (state, action) => ({
        ...state,
        loading: action.payload,
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
    [
      venueActions.setVenueMedia,
      (state, action) => ({
        ...state,
        loading: false,
        venue: {
          ...state.venue,
          media: action.payload || [],
        },
      }),
    ],
    [
      venueActions.setVenueProductGroups,
      (state, action) => ({
        ...state,
        loading: false,
        productGroups: action.payload,
      }),
    ],
    [
      venueActions.setVenueProducts,
      (state, action) => ({
        ...state,
        loading: false,
        products: action.payload,
      }),
    ],
    [
      venueActions.setProductMedia,
      (state, action) => ({
        ...state,
        loading: false,
        productMedia: action.payload,
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    venues: null,
    venue: null,
    productGroups: null,
    products: null,
    productMedia: null,
  },
);

export default venueReducer;
