import { createActions } from 'redux-actions';
import { push } from 'connected-react-router';
import * as API from 'helpers/api';

const options = {
  prefix: 'ADMIN',
};

const adminActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    SET_USERS: undefined,
    SET_USER: undefined,
  },
  options,
);

const getUsers = (payload) => async (dispatch) => {
  try {
    dispatch(adminActions.setLoading(true));
    const data = await API.getUsers();
    dispatch(adminActions.setUsers({ ...data, ...payload }));
  } catch (error) {
    dispatch(adminActions.setFailure(error));
  }
};

const getOneUser = (payload) => async (dispatch) => {
  try {
    dispatch(adminActions.setLoading(true));
    const data = await API.getOneUser(payload);
    dispatch(adminActions.setUser({ ...data, ...payload }));
  } catch (error) {
    dispatch(adminActions.setFailure(error));
  }
};

const createUser = (payload) => async (dispatch) => {
  try {
    dispatch(adminActions.setLoading(true));
    await API.createUser(payload);
    dispatch(adminActions.setLoading(false));
    dispatch(getUsers());
    dispatch(push('/users'));
  } catch (error) {
    dispatch(adminActions.setFailure(error));
  }
};

const updateUser = (payload) => async (dispatch) => {
  try {
    dispatch(adminActions.setLoading(true));
    await API.updateUser(payload);
    dispatch(adminActions.setLoading(false));
    dispatch(getUsers());
    dispatch(push('/users'));
  } catch (error) {
    dispatch(adminActions.setFailure(error));
  }
};

const deleteUser = (payload) => async (dispatch) => {
  try {
    dispatch(adminActions.setLoading(true));
    await API.deleteUser(payload);
    dispatch(adminActions.setLoading(false));
    dispatch(getUsers());
  } catch (error) {
    dispatch(adminActions.setFailure(error));
  }
};

export default {
  ...adminActions,
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
