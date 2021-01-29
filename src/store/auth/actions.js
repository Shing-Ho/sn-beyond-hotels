import { createActions } from 'redux-actions';
import { push } from 'connected-react-router';
import * as API from 'helpers/api';

const options = {
  prefix: 'AUTH',
};

const authActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    SET_TOKEN: undefined,
    SET_USER: undefined,
  },
  options,
);

const login = (payload) => async (dispatch) => {
  try {
    dispatch(authActions.setLoading(true));
    const data = await API.login(payload);
    dispatch(authActions.setToken(data.token));
    const user = await API.getUser();
    dispatch(authActions.setUser(user));
    dispatch(push('/users'));
  } catch (error) {
    dispatch(authActions.setFailure(error));
  }
};

export default {
  ...authActions,
  login,
};
