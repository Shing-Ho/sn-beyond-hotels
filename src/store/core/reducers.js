import { handleActions } from 'redux-actions';
import { coreActions } from 'store/core/actions';

export const coreReducer = handleActions(
  new Map([
    [
      coreActions.setLoading,
      (state) => ({
        ...state,
        loading: true,
        error: null,
      }),
    ],
    [
      coreActions.setFailure,
      (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }),
    ],
    [
      coreActions.getLanguagesSuccess,
      (state, action) => {
        const languages = Object.keys(action.payload).map((code) => ({
          code,
          ...action.payload[code],
        }));

        return {
          ...state,
          loading: false,
          languages,
        };
      },
    ],
    [
      coreActions.setLocale,
      (state, action) => ({
        ...state,
        loading: false,
        locale: action.payload,
      }),
    ],
    [
      coreActions.setFormSubmit,
      (state, action) => ({
        ...state,
        formSubmitted: {
          ...state.formSubmitted,
          [action.payload]: !state.formSubmitted[action.payload],
        },
      }),
    ],
    [
      coreActions.toggleDrawer,
      (state, action) => ({
        ...state,
        cartDrawer: action.payload,
      }),
    ],
    [
      coreActions.toggleDrawerOpen,
      (state) => ({
        ...state,
        drawerOpen: !state.drawerOpen,
      }),
    ],
    [
      coreActions.setCurrency,
      (state, action) => ({
        ...state,
        currency: action.payload,
      }),
    ],
    [
      coreActions.setCurrentMenu,
      (state, action) => ({
        ...state,
        currentMenu: action.payload,
      }),
    ],
    [
      coreActions.setTopFilters,
      (state, action) => ({
        ...state,
        topFilters: action.payload,
      }),
    ],
    [
      coreActions.setTopFilterType,
      (state, action) => ({
        ...state,
        topFilterType: action.payload,
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    locale: 'en',
    languages: [],
    formSubmitted: {},
    topFilterType: 'hotel',
    topFilters: {},
    drawerOpen: false,
    currency: 'USD',
    cartDrawer: false,
    currentMenu: '/',
  },
);

export default coreReducer;
