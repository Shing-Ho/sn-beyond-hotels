import { createActions } from 'redux-actions';
// import * as API from 'helpers/api';

const options = {
  prefix: 'CORE',
};

export const coreActions = createActions(
  {
    SET_LOADING: undefined,
    SET_FAILURE: undefined,
    GET_LANGUAGES_SUCCESS: undefined,
    SET_LOCALE: undefined,
    SET_FORM_SUBMIT: undefined,
    TOGGLE_DRAWER_OPEN: undefined,
    SET_CURRENCY: undefined,
    TOGGLE_DRAWER: undefined,
    SET_CURRENT_MENU: undefined,
  },
  options,
);

const showCartDrawer = (payload) => (dispatch) => {
  dispatch(coreActions.toggleDrawer(payload));
};

export default {
  ...coreActions,
  showCartDrawer,
  // getLanguages,
  // setLanguage,
};
