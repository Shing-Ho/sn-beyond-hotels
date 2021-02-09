import { createActions } from 'redux-actions';
import { push } from 'connected-react-router';
import { notification } from 'antd';
import * as API from 'helpers/api';

const options = {
  prefix: 'VENUE',
};

const venueActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    SET_VENUES: undefined,
    SET_VENUE: undefined,
  },
  options,
);

const getVenues = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    const data = await API.getVenues();
    dispatch(venueActions.setVenues({ ...data, ...payload }));
  } catch (error) {
    dispatch(venueActions.setFailure(error));
  }
};

const getVenue = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    const data = await API.getVenue(payload);
    dispatch(venueActions.setVenue({ ...data }));
  } catch (error) {
    dispatch(venueActions.setFailure(error));
  }
};

const createVenue = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    const data = await API.createVenue(payload);
    dispatch(venueActions.setLoading(false));
    dispatch(venueActions.setVenue({ ...data }));
    dispatch(push(`/venues/${data.type.toLowerCase()}/${data.id}`));
  } catch (error) {
    dispatch(venueActions.setFailure(error));
  }
};

const updateVenue = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    const data = await API.updateVenue(payload);
    dispatch(venueActions.setLoading(false));
    dispatch(venueActions.setVenue({ ...data }));
    notification['success']({
      message: 'Update',
      description: 'Venue Updated!',
    });
  } catch (error) {
    dispatch(venueActions.setFailure(error));
  }
};

export default {
  ...venueActions,
  getVenues,
  getVenue,
  createVenue,
  updateVenue,
};
