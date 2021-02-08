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
export const cancelReservation = (payload) => post('carey/cancel-reservation', payload, postHeader);
