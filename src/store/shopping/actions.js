import { createActions } from 'redux-actions';
import { filterShoppingItems } from 'helpers/utils';

const options = {
  prefix: 'SHOPPING',
};

const shoppingActions = createActions(
  {
    UPDATE_FILTERS: undefined,
    SET_FILTERED_SHOPPING: undefined,
    SET_SELECTED_CATEGORY: undefined,
    CLEAR_FILTERS: undefined,
  },
  options,
);

const onCategoryFilterChange = (changes) => (dispatch, getState) => {
  const {
    shopping: { products, filters },
  } = getState();
  const updatedFilters = {
    ...filters,
    ...changes,
  };
  dispatch(shoppingActions.updateFilters(updatedFilters));
  dispatch(shoppingActions.setSelectedCategory(changes.categoryid));
  const filteredProducts = filterShoppingItems(products, updatedFilters);
  dispatch(shoppingActions.setFilteredShopping(filteredProducts));
};

const onSearchFilterChange = (changes) => (dispatch, getState) => {
  const {
    shopping: { products, filters },
  } = getState();
  const updatedFilters = {
    ...filters,
    ...changes,
  };
  dispatch(shoppingActions.updateFilters(updatedFilters));
  const filteredProducts = filterShoppingItems(products, updatedFilters);
  dispatch(shoppingActions.setFilteredShopping(filteredProducts));
};

const clearFilters = () => (dispatch) => {
  dispatch(shoppingActions.clearFilters());
};
export default {
  ...shoppingActions,
  onSearchFilterChange,
  onCategoryFilterChange,
  clearFilters,
};
