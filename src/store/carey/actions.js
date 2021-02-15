import { createActions } from 'redux-actions';
import * as API from 'helpers/api';

const options = {
  prefix: 'CAREY',
};

const careyActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    GET_CAREY_RATE_Inquiry: undefined,
    BOOK_RESERVATION: undefined,
    FIND_RESERVATION: undefined,
    CLEAR_STATE: undefined,
    CANCEL_RESERVATION: undefined,
  },
  options,
);

const getRateInquiry = (payload) => async (dispatch) => {
  try {
    dispatch(careyActions.setLoading(true));
    const data = await API.rateInquiry(payload);
    dispatch(careyActions.getCareyRateInquiry(data));
  } catch (error) {
    dispatch(careyActions.setFailure(error));
  }
};

const bookReservation = (payload) => async (dispatch) => {
  try {
    dispatch(careyActions.setLoading(true));
    const data = await API.bookReservation(payload);
    dispatch(careyActions.bookReservation(data));
  } catch (error) {
    dispatch(careyActions.setFailure(error));
  }
};

const findReservation = (payload) => async (dispatch) => {
  try {
    dispatch(careyActions.setLoading(true));
    const data = await API.findReservation(payload);
    dispatch(careyActions.findReservation(data));
  } catch (error) {
    dispatch(careyActions.setFailure(error));
  }
};

const cancelReservation = (payload) => async (dispatch) => {
  try {
    dispatch(careyActions.setLoading(true));
    const data = await API.cancelReservation(payload);
    dispatch(careyActions.cancelReservation({ ...data, ...payload }));
  } catch (error) {
    dispatch(careyActions.setFailure(error));
  }
};

export default {
  ...careyActions,
  getRateInquiry,
  bookReservation,
  findReservation,
  cancelReservation,
};
