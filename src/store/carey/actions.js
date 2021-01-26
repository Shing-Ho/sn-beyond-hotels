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
    CLEAR_STATE: undefined,
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

export default {
  ...careyActions,
  getRateInquiry,
};
