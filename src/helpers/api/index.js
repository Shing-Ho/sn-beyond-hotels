import { post, get } from './api-helper';

const postHeader = {
  'X-API-KEY': 'XeTNthwT.42v4L87XoyQ1Odfg10BTpIBGT2qr3gvN'
};

export const searchHotels = (search) => post('hotels/search-by-location', search, postHeader);
export const searchHotelById = (search) => post('hotels/search-by-id', search, postHeader);
// export const addProduct = (data) => post('products', data);
export const bookingHotel = (payload) => post('hotels/booking', payload, postHeader);
export const locations = payload => get(`locations/prefix?prefix=${payload}&lang_code=en`);
export const cancelLookup = payload => post(`hotels/cancel`, payload, postHeader);
export const cancelOrder = payload => post(`hotels/cancel-confirm`, payload, postHeader);