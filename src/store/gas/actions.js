import { createActions } from 'redux-actions';
import * as API from 'helpers/api';

const options = {
  prefix: 'GAS',
};

const gasActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    SET_GAS_STATIONS: undefined,
  },
  options,
);

const getGasStations = () => async (dispatch) => {
  try {
    const data = await API.getGasStations();
    console.log('gas action response', data);
    dispatch(gasActions.setGasStations(data));
  } catch (error) {
    dispatch(gasActions.setFailure(error));
  }
};

export default {
  ...gasActions,
  getGasStations,
};
