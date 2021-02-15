import queryString from 'query-string';
import { post, get, put, remove } from './api-helper';

const postHeader = {
  'X-API-KEY': '',
};

export const setAuthHeaders = () => {
  const queryParams = queryString.parse(window.location.search);
  const oldKey = localStorage.getItem('SIMPLENIGHT-X-API-KEY');
  let newKey;
  if (queryParams.apiKey) {
    newKey = queryParams.apiKey;
  } else if (oldKey) {
    newKey = oldKey;
  } else {
    newKey = 'XeTNthwT.42v4L87XoyQ1Odfg10BTpIBGT2qr3gvN';
  }
  postHeader['X-API-KEY'] = newKey;
  localStorage.setItem('SIMPLENIGHT-X-API-KEY', newKey);
};

export const searchHotels = (search) => post('hotels/search-by-location', search, postHeader);
export const searchHotelById = (search) => post('hotels/search-by-id', search, postHeader);
// export const addProduct = (data) => post('products', data);
export const bookingHotel = (payload) => post('hotels/booking', payload, postHeader);
export const locations = (payload) => get(`locations/prefix?prefix=${payload}&lang_code=en`);
export const cancelLookup = (payload) => post(`hotels/cancel`, payload, postHeader);
export const cancelOrder = (payload) => post(`hotels/cancel-confirm`, payload, postHeader);

// -- Gas -- //
export const getGasStations = (params) => get(`charging/poi?maxresults=200`, params);

// -- Adventures -- //
export const getStandardCountries = () => get(`urban/get_standard_countries`);
export const getAdventureCountries = () => get(`urban/get_ua_countries`);
export const getAdventureDestinations = (params) => get(`urban/get_ua_destinations`, params);
export const getAdventureTrips = (params) => get(`urban/get_trips`, params);
export const getTripInfo = (params) => get(`urban/get_trip_info`, params);
export const getTripAvailabilities = (params) => get(`urban/get_trip_availabilities`, params);
export const bookTrip = (params) => get(`urban/book_trip`, params);
export const cancelBook = (params) => get(`urban/cancel_booking`, params);

// Authentication
export const login = (payload) => post(`accounts/login`, payload);
export const getUser = () => get(`accounts/user`);

// Admin user management
export const getUsers = () => get(`users`);
export const getOneUser = (id) => get(`users/${id}`);
export const createUser = (payload) => post(`users`, payload);
export const updateUser = (payload) => put(`users/${payload.id}`, payload);
export const deleteUser = (id) => remove(`users/${id}`);

// ---Carey --- //
export const rateInquiry = (payload) => post('carey/rate-inqury', payload, postHeader);
export const bookReservation = (payload) => post('carey/book-reservation', payload, postHeader);
export const findReservation = (payload) => post('carey/find-reservation', payload, postHeader);
export const cancelReservation = (payload) => post('carey/cancel-reservation', payload, postHeader);

// --- Dining --- //
export const getDining = (payload) => post('dinings/search-by-id', payload, postHeader);
export const getDinings = (payload) => post('dinings/search', payload, postHeader);
export const getDiningAvailabilities = (payload) => post('dinings/available-times', payload, postHeader);
export const getDiningReviews = (payload) => post('dinings/reviews', payload, postHeader);
export const createDiningBooking = (payload) => post('dinings/booking', payload, postHeader);
export const cancelDiningBooking = (payload) => post('dinings/cancel-booking', payload, postHeader);

// Venues
export const getVenues = () => get(`venues`);
export const getVenue = (id) => get(`venues/${id}`);
export const createVenue = (payload) => post(`venues`, payload);
export const updateVenue = (payload) => put(`venues/${payload.id}`, payload);

// Venue media
export const uploadVenueMedia = (payload) =>
  post(`venues/${payload.venue}/media`, payload.formData, { 'content-type': 'multipart/form-data' });
export const getVenueMedia = (id) => get(`venues/${id}/media`);
export const updateVenueMediaOrder = (payload) => post(`venues/${payload.id}/media/order`, payload);
export const removeVenueMedia = (payload) => remove(`venues/${payload.venue_id}/media/${payload.id}`);

// Venue Product Group
export const getVenueProductGroups = (id) => get(`venues/${id}/product-group`);
export const createVenueProductGroup = (payload) => post(`venues/${payload.venue}/product-group`, payload);
export const updateVenueProductGroup = (payload) => put(`venues/${payload.venue}/product-group/${payload.id}`, payload);
export const removeVenueProductGroup = (payload) => remove(`venues/${payload.venue}/product-group/${payload.id}`);
export const updateVenueProductGroupOrder = (payload) => post(`venues/${payload.venue}/product-group/order`, payload);

// Venue Product Nightlife
export const getVenueProductsNightLife = (id) => get(`venues/${id}/product_nightlife`);
export const createVenueProductNightLife = (payload) => post(`venues/${payload.venue}/product_nightlife`, payload);
export const updateVenueProductNightLife = (payload) =>
  put(`venues/${payload.venue}/product_nightlife/${payload.id}`, payload);
export const removeVenueProductNightLife = (payload) =>
  remove(`venues/${payload.venue}/product_nightlife/${payload.id}`);
export const updateVenueProductNightLifeOrder = (payload) =>
  post(`venues/${payload.venue}/product_nightlife/order`, payload);

// Venue Product Nightlife Media
export const getVenueProductsNightLifeMedia = (id) => get(`product_nightlife_media?product_id=${id}`);
export const uploadVenueProductNightLifeMedia = (payload) =>
  post(`product_nightlife_media`, payload.formData, { 'content-type': 'multipart/form-data' });
export const removeVenueProductNightLifeMedia = (payload) => remove(`product_nightlife_media/${payload.id}`);
export const updateVenueProductNightLifeMediaOrder = (payload) => post(`product_nightlife_media/order`, payload);
