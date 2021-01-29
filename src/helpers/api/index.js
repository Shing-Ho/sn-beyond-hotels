import { post, get, put, remove } from './api-helper';

const postHeader = {
  'X-API-KEY': 'XeTNthwT.42v4L87XoyQ1Odfg10BTpIBGT2qr3gvN',
};

export const searchHotels = (search) => post('hotels/search-by-location', search, postHeader);
export const searchHotelById = (search) => post('hotels/search-by-id', search, postHeader);
// export const addProduct = (data) => post('products', data);
export const bookingHotel = (payload) => post('hotels/booking', payload, postHeader);
export const locations = (payload) => get(`locations/prefix?prefix=${payload}&lang_code=en`);
export const cancelLookup = (payload) => post(`hotels/cancel`, payload, postHeader);
export const cancelOrder = (payload) => post(`hotels/cancel-confirm`, payload, postHeader);

// -- Gas -- //
export const getGasStations = ({ latitude, longitude }) =>
  get(`charging/poi?maxresults=200&latitude=${latitude}&longitude=${longitude}`);

// Authentication
export const login = (payload) => post(`accounts/login`, payload);
export const getUser = () => get(`accounts/user`);

// Admin user management
export const getUsers = () => get(`users`);
export const getOneUser = (id) => get(`users/${id}`);
export const createUser = (payload) => post(`users`, payload);
export const updateUser = (payload) => put(`users/${payload.id}`, payload);
export const deleteUser = (id) => remove(`users/${id}`);
