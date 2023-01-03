/* eslint-disable no-undef */
import itActsAslikedRestaurantModel from './contract/likedRestaurantContract';
import LikedRestaurantIdb from '../src/scripts/data/liked-restaurant-idb';

describe('Liked Restaurant Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await LikedRestaurantIdb.getAllRestaurants()).forEach(async (restaurant) => {
      await LikedRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAslikedRestaurantModel(LikedRestaurantIdb);
});
