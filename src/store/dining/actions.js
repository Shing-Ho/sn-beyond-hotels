import { createActions } from 'redux-actions';
import * as API from 'helpers/api';

const options = {
  prefix: 'DINING',
};

const diningActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    SET_DININGS: undefined,
  },
  options,
);

const getDinings = (params) => async (dispatch) => {
  try {
    const data = await API.getDinings(params);
    console.log(data);
    dispatch(diningActions.setDinings(data));
  } catch (error) {
    dispatch(diningActions.setFailure(error));
  }
};

export default {
  ...diningActions,
  getDinings,
};
