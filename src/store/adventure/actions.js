import { createActions } from 'redux-actions';
import * as API from 'helpers/api';

const options = {
  prefix: 'ADVENTURE',
};

const adventureActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    SET_BOOKING_ERROR: undefined,
    SET_TRIPS: undefined,
    SET_COUNTRIES: undefined,
    SET_STANDARD_COUNTRIES: undefined,
    SET_DESTINATIONS: undefined,
    SET_TRIP_INFO: undefined,
    SET_TRIP_AVAILABILITIES: undefined,
    SET_BOOK_INFO: undefined,
  },
  options,
);

const getAdventureTrips = (params) => async (dispatch) => {
  try {
    const data = await API.getAdventureTrips(params);
    if (data.data.List) {
      if (Array.isArray(data.data.List)) {
        dispatch(adventureActions.setTrips(data.data.List));
      } else {
        dispatch(adventureActions.setTrips([data.data.List]));
      }
    } else {
      dispatch(adventureActions.setTrips([]));
    }
  } catch (error) {
    dispatch(adventureActions.setFailure(error));
  }
};

const getAdventureCountries = (params) => async (dispatch) => {
  try {
    const data = await API.getAdventureCountries(params);
    dispatch(adventureActions.setCountries(data.data.UACountryList));
  } catch (error) {
    dispatch(adventureActions.setFailure(error));
  }
};

const getStandardCountries = (params) => async (dispatch) => {
  try {
    const data = await API.getStandardCountries(params);
    dispatch(adventureActions.setStandardCountries(data.data.StandardCountryList));
  } catch (error) {
    dispatch(adventureActions.setFailure(error));
  }
};

const getTripInfo = (params) => async (dispatch) => {
  try {
    const data = await API.getTripInfo(params);
    dispatch(adventureActions.setTripInfo(data.data.TripInfo));
  } catch (error) {
    dispatch(adventureActions.setFailure(error));
  }
};

const bookTrip = (params) => async (dispatch) => {
  try {
    dispatch(adventureActions.setBookingError(null));
    const data = await API.bookTrip(params);
    dispatch(adventureActions.setBookInfo(data.data));
    if (data.data?.OpResult?.Code !== '0') {
      dispatch(adventureActions.setBookingError(data.data?.OpResult?.Message));
    }
  } catch (error) {
    dispatch(adventureActions.setFailure(error));
  }
};

const getTripAvailabilities = (params) => async (dispatch) => {
  try {
    const data = await API.getTripAvailabilities(params);
    dispatch(adventureActions.setTripAvailabilities(data.data.TripAvai));
  } catch (error) {
    dispatch(adventureActions.setFailure(error));
  }
};

const cancelBook = (params) => async (dispatch) => {
  try {
    await API.cancelBook(params);
    dispatch(adventureActions.setBookInfo(null));
  } catch (error) {
    dispatch(adventureActions.setFailure(error));
  }
};

const getAdventureDestinations = (params) => async (dispatch) => {
  try {
    const data = await API.getAdventureDestinations(params);
    if (data.data.DestinationList) {
      if (Array.isArray(data.data.DestinationList)) {
        dispatch(adventureActions.setDestinations(data.data.DestinationList));
      } else {
        dispatch(adventureActions.setDestinations([data.data.DestinationList]));
      }
    } else {
      dispatch(adventureActions.setDestinations([]));
    }
  } catch (error) {
    dispatch(adventureActions.setFailure(error));
  }
};

export default {
  ...adventureActions,
  getAdventureTrips,
  getAdventureCountries,
  getAdventureDestinations,
  getTripInfo,
  getTripAvailabilities,
  getStandardCountries,
  bookTrip,
  cancelBook,
};
