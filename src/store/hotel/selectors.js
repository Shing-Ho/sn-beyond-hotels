export const hotelItemFormatter = (data) => ({
  ...data,
  id: data.hotel_id,
  rate: data.avg_nightly_rate,
  base: data.avg_nightly_base,
  tax: data.avg_nightly_tax,
  image: data.hotel_details?.thumbnail_url,
  name: data.hotel_details?.name,
  rating: data.hotel_details?.review_rating / 2 || data.hotel_details?.star_rating,
  description: data.hotel_details?.property_description,
  geolocation: data.hotel_details?.geolocation,
  detail: data.hotel_details,
});
export const getHotels = (state) => state.hotel.hotels;
export const getFilteredHotels = (state) => state.hotel.filteredHotels;
export const getVisibleHotels = (state) => state.hotel.visibleHotels;
export const getFormattedHotels = (state) => state.hotel.hotels.map(hotelItemFormatter);
export const getFormattedFilteredHotels = (state) => state.hotel.filteredHotels.map(hotelItemFormatter);
export const getFormattedVisibleHotels = (state) => state.hotel.visibleHotels.map(hotelItemFormatter);
export const getTotalCount = (state) => state.hotel.count;
export const getFilters = (state) => state.hotel.filters;
export const getLoading = (state) => state.hotel.loading;
export const getFetchingRecords = (state) => state.hotel.fetchingRecords;
export const getSelectedHotel = (state) => state.hotel.selectedHotel;
export const getLocationData = (state) => state.hotel.locationData;
export const getTopFilters = (state) => state.hotel.topFilters;
export const getCancelLookupResponse = (state) => state.hotel.cancelLookupResponse;
export const getCancelOrderResponse = (state) => state.hotel.cancelOrderResponse;
export const getError = (state) => state.hotel.error;
export const getSearchData = (state) => state?.hotel?.searchData;
