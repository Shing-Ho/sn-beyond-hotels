import { createActions } from 'redux-actions';
import * as API from 'helpers/api';

const options = {
  prefix: 'ADVENTURE',
};

const adventureActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    SET_TRIPS: undefined,
    SET_COUNTRIES: undefined,
    SET_DESTINATIONS: undefined,
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
};
