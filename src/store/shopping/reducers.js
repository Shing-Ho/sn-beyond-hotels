import { handleActions } from 'redux-actions';
import shoppingActions from 'store/shopping/actions';
import shoppingItems from '../../pages/ShoppingPage/ProductJson/product.json';

export const shoppingReducer = handleActions(
  new Map([
    [
      shoppingActions.getProducts,
      (state, action) => ({
        ...state,
        products: [...action.payload],
      }),
    ],
    [
      shoppingActions.getFilteredProducts,
      (state, action) => ({
        ...state,
        filteredProducts: [...action.payload],
      }),
    ],
    [
      shoppingActions.updateFilters,
      (state, action) => ({
        ...state,
        filters: action.payload,
      }),
    ],
    [
      shoppingActions.setFilteredShopping,
      (state, action) => ({
        ...state,
        filteredProducts: [...action.payload],
      }),
    ],
    [
      shoppingActions.getSelectedCategory,
      (state, action) => ({
        ...state,
        filteredProducts: [...action.payload],
      }),
    ],
    [
      shoppingActions.setSelectedCategory,
      (state, action) => ({
        ...state,
        selectedCategory: action.payload,
      }),
    ],
    [
      shoppingActions.clearFilters,
      (state) => ({
        ...state,
        selectedCategory: -1,
        filters: {},
        filteredProducts: [...shoppingItems],
        shopbyView: 'PRODUCTS',
      }),
    ],
    [
      shoppingActions.setShopByView,
      (state, action) => ({
        ...state,
        shopbyView: action.payload,
      }),
    ],
    [
      shoppingActions.selectStore,
      (state, action) => ({
        ...state,
        selectedStore: action.payload,
        loading: false,
      }),
    ],
    [
      shoppingActions.selectProduct,
      (state, action) => ({
        ...state,
        selectedProduct: action.payload,
        loading: false,
      }),
    ],
  ]),
  {
    loading: false,
    error: null,
    products: [...shoppingItems],
    filteredProducts: [...shoppingItems],
    filters: {},
    selectedCategory: -1,
    shopbyView: 'PRODUCTS',
    selectedStore: {},
    selectedProduct: {},
  },
);

export default shoppingReducer;
