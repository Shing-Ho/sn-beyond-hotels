export const getLoading = (state) => state.venue.loading;
export const getError = (state) => state.venue.error;
export const getVenues = (state) => state.venue.venues;
export const getVenue = (state) => state.venue.venue;
export const getProductGroups = (state) => state.venue.productGroups;
export const getProducts = (state) => state.venue.products;
export const getProductsByGroup = (id) => (state) => {
  const products = getProducts(state).filter((product) => product.product_group === id);
  return products || [];
};
