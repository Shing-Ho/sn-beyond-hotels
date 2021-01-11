import { filter, flatMapDeep } from 'lodash';
import popularBrandsJson from './jsons/popular-brands.json';

export const getRandomImageUrl = (width = 500, height = 300) =>
  `http://placeimg.com/${width}/${height}/travel${(Math.random() * 10000).toFixed()}`;

export const filterHotels = (hotels, filters, sortBy) => {
  let filteredHotels = hotels;
  if (filters.hotel_id) {
    filteredHotels = filteredHotels.filter((hotel) => hotel.hotel_id === filters.hotel_id);
  }

  if (filters.keyword && filters.keyword !== '') {
    filteredHotels = filteredHotels.filter((hotel) => {
      if (
        hotel.hotel_details &&
        hotel.hotel_details.name &&
        hotel.hotel_details.name.toLowerCase().indexOf(filters.keyword) >= 0
      )
        return true;
      if (
        hotel.hotel_details &&
        hotel.hotel_details.description &&
        hotel.hotel_details.description.toLowerCase().indexOf(filters.keyword) >= 0
      )
        return true;
      return false;
    });
  }

  if (filters.minPrice && filters.minPrice > 0) {
    filteredHotels = filteredHotels.filter((hotel) => hotel.avg_nightly_rate >= filters.minPrice);
  }
  if (filters.location && filters.location !== '') {
    filteredHotels = filteredHotels.filter((hotel) => hotel.hotel_details.address.city === filters.location);
  }

  if (filters.adult && filters.adult > 0) {
    filteredHotels = filteredHotels.filter((hotel) => {
      for (let i = 0; i < hotel.room_types.length; i += 1) {
        return hotel.room_types[i].capacity.adults >= filters.adult;
      }
      return false;
    });
  }
  if (filters.child && filters.child > 0) {
    filteredHotels = filteredHotels.filter((hotel) => {
      for (let i = 0; i < hotel.room_types.length; i += 1) {
        return hotel.room_types[i].capacity.child >= filters.child;
      }
      return false;
    });
  }
  if (filters.rooms && filters.rooms > 0) {
    filteredHotels = filteredHotels.filter((hotel) => {
      for (let i = 0; i < hotel.room_types.length; i += 1) {
        return hotel.room_types[i].capacity.num_rooms >= filters.rooms;
      }
      return false;
    });
  }

  if (filters.maxPrice) {
    filteredHotels = filteredHotels.filter((hotel) => hotel.avg_nightly_rate <= filters.maxPrice);
  }
  if (filters.starRating && filters.starRating > 0) {
    filteredHotels = filteredHotels.filter((hotel) => hotel.hotel_details.star_rating === filters.starRating);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    filteredHotels = filteredHotels.filter((hotel) => {
      for (let i = 0; i < filters.amenities.length; i += 1) {
        if (hotel.hotel_details.amenities.indexOf(filters.amenities[i]) < 0) {
          return false;
        }
      }
      return true;
    });
  }
  if (filters.brands && filters.brands.length) {
    const brandsData = [];
    filters.brands.forEach((brand) => brandsData.push(popularBrandsJson[brand]));
    filteredHotels = filteredHotels.filter((hotel) => {
      const brandsDataAlias = flatMapDeep(brandsData);
      const chainCodes = brandsDataAlias.map((data) => data.chainCode);
      const chainName = brandsDataAlias.map((data) => data.chainName);
      return chainCodes.includes(hotel.hotel_details.chain_code) || chainName.includes(hotel.hotel_details.chain_name);
    });
  }
  if (sortBy === 'lowToHigh') {
    return filteredHotels.sort((a, b) => a.avg_nightly_rate - b.avg_nightly_rate);
  }
  if (sortBy === 'highToLow') {
    return filteredHotels.sort((a, b) => b.avg_nightly_rate - a.avg_nightly_rate);
  }
  if (sortBy === 'stars') {
    return filteredHotels.sort((a, b) => a.hotel_details.star_rating - b.hotel_details.star_rating);
  }
  return filteredHotels;
};

export const getVisibleHotels = (hotels, page, pageSize) => hotels.slice((page - 1) * pageSize, page * pageSize);

export const commaFormat = (text) => text?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export const filterShoppingItems = (products, filters) => {
  let filteredProducts = products;
  if (filters.keyword && filters.keyword !== '') {
    filteredProducts = filteredProducts.filter((product) => {
      if (product.productName && product.productName.toLowerCase().indexOf(filters.keyword) >= 0) return true;
      if (product.productDetail && product.productDetail.toLowerCase().indexOf(filters.keyword) >= 0) return true;
      return false;
    });
  }

  if (filters.minPrice && parseInt(filters.minPrice, 10) > 0) {
    filteredProducts = filteredProducts.filter((product) => product.price >= filters.minPrice);
  }
  if (filters.maxPrice && parseInt(filters.maxPrice, 10) > 0) {
    filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice);
  }
  if (filters.starRating && filters.starRating > 0) {
    filteredProducts = filteredProducts.filter((product) => product.rating <= filters.starRating);
  }
  if (filters.categoryid && filters.categoryid > 0) {
    filteredProducts = filteredProducts.filter(
      (product) => parseInt(product.categoryid, 10) === parseInt(filters.categoryid, 10),
    );
  }

  if (filters.storeid && parseInt(filters.storeid, 10) > 0) {
    filteredProducts = filteredProducts.filter((product) => product.storeid === filter.storeid);
  }

  return filteredProducts;
};
