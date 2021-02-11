import { createActions } from 'redux-actions';
import { push } from 'connected-react-router';
import { message } from 'antd';
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
    SET_VENUE_MEDIA: undefined,
    SET_VENUE_PRODUCT_GROUPS: undefined,
  },
  options,
);

// ========== Venue Start =================
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
    message.success('Updated successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Failed.');
  }
};
// ========== Venue End =================

// ========== Venue media Start =================
const getVenueMedia = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    const data = await API.getVenueMedia(payload);
    dispatch(venueActions.setVenueMedia(data.results));
    dispatch(venueActions.setLoading(false));
  } catch (error) {
    dispatch(venueActions.setFailure(error));
  }
};

const uploadVenueMedia = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.uploadVenueMedia(payload);
    dispatch(getVenueMedia(payload.venue));
    message.success('File uploaded successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('File upload failed.');
  }
};

const updateVenueMediaOrder = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.updateVenueMediaOrder(payload);
    dispatch(getVenueMedia(payload.id));
    message.success('Updated successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Failed.');
  }
};

const removeVenueMedia = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.removeVenueMedia(payload);
    dispatch(venueActions.setLoading(false));
    dispatch(getVenueMedia(payload.venue_id));
    message.success('Removed successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Faild.');
  }
};
// ========== Venue media End =================

// ========== Venue Product Group Start =================
const getVenueProductGroups = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    const data = await API.getVenueProductGroups(payload);
    dispatch(venueActions.setVenueProductGroups(data.results));
  } catch (error) {
    dispatch(venueActions.setFailure(error));
  }
};
const createVenueProductGroup = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.createVenueProductGroup(payload);
    dispatch(getVenueProductGroups(payload.venue));
    message.success('Created successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Faild.');
  }
};
const updateVenueProductGroup = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.updateVenueProductGroup(payload);
    dispatch(getVenueProductGroups(payload.venue));
    message.success('Updated successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Faild.');
  }
};
const removeVenueProductGroup = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.removeVenueProductGroup(payload);
    dispatch(venueActions.setLoading(false));
    dispatch(getVenueProductGroups(payload.venue));
    message.success('Removed successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Faild.');
  }
};
// ========== Venue Product Group End =================

export default {
  ...venueActions,
  getVenues,
  getVenue,
  createVenue,
  updateVenue,

  uploadVenueMedia,
  updateVenueMediaOrder,
  getVenueMedia,
  removeVenueMedia,

  getVenueProductGroups,
  createVenueProductGroup,
  updateVenueProductGroup,
  removeVenueProductGroup,
};
