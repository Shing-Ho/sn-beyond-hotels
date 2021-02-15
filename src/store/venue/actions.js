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
    SET_VENUE_PRODUCTS: undefined,
    SET_PRODUCT_MEDIA: undefined,
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
const updateVenueProductGroupOrder = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.updateVenueProductGroupOrder(payload);
    dispatch(getVenueProductGroups(payload.venue));
    message.success('Updated successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Failed.');
  }
};
// ========== Venue Product Group End =================

// ========== Venue Product NightLife Start =================
const getVenueProductsNightLife = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    const data = await API.getVenueProductsNightLife(payload);
    dispatch(venueActions.setVenueProducts(data.results));
  } catch (error) {
    dispatch(venueActions.setFailure(error));
  }
};
const createVenueProductNightLife = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.createVenueProductNightLife(payload);
    dispatch(getVenueProductsNightLife(payload.venue));
    message.success('Created successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Faild.');
  }
};
const updateVenueProductNightLife = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.updateVenueProductNightLife(payload);
    dispatch(getVenueProductsNightLife(payload.venue));
    message.success('Updated successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Faild.');
  }
};
const removeVenueProductNightLife = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.removeVenueProductNightLife(payload);
    dispatch(venueActions.setLoading(false));
    dispatch(getVenueProductsNightLife(payload.venue));
    message.success('Removed successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Faild.');
  }
};
const updateVenueProductNightLifeOrder = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.updateVenueProductNightLifeOrder(payload);
    dispatch(getVenueProductsNightLife(payload.venue));
    message.success('Updated successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Failed.');
  }
};
// ========== Venue Product NightLife End =================

// ========== Venue Product NightLife media Start =================
const getVenueProductsNightLifeMedia = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    const data = await API.getVenueProductsNightLifeMedia(payload);
    dispatch(venueActions.setProductMedia(data.results));
    dispatch(venueActions.setLoading(false));
  } catch (error) {
    dispatch(venueActions.setFailure(error));
  }
};

const uploadVenueProductNightLifeMedia = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.uploadVenueProductNightLifeMedia(payload);
    dispatch(getVenueProductsNightLife(payload.venue));
    message.success('File uploaded successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('File upload failed.');
  }
};

const updateVenueProductNightLifeMediaOrder = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.updateVenueProductNightLifeMediaOrder(payload);
    dispatch(getVenueProductsNightLife(payload.venue));
    message.success('Updated successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Failed.');
  }
};

const removeVenueProductNightLifeMedia = (payload) => async (dispatch) => {
  try {
    dispatch(venueActions.setLoading(true));
    await API.removeVenueProductNightLifeMedia(payload);
    dispatch(venueActions.setLoading(false));
    dispatch(getVenueProductsNightLife(payload.venue));
    message.success('Removed successfully.');
  } catch (error) {
    dispatch(venueActions.setFailure(error));
    message.error('Faild.');
  }
};
// ========== Venue media End =================

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
  updateVenueProductGroupOrder,

  getVenueProductsNightLife,
  createVenueProductNightLife,
  updateVenueProductNightLife,
  removeVenueProductNightLife,
  updateVenueProductNightLifeOrder,

  getVenueProductsNightLifeMedia,
  uploadVenueProductNightLifeMedia,
  removeVenueProductNightLifeMedia,
  updateVenueProductNightLifeMediaOrder,
};
