/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
import LikedRestaurantIdb from '../src/scripts/data/liked-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking A Restaurant', () => {
  const likeButton = document.createElement('like-button');
  const headerBar = document.createElement('header-bar');
  const dataSample = { id: 1 };

  beforeEach(async () => {
    await TestFactories.createHeaderBar(headerBar);
    await LikedRestaurantIdb.putRestaurant(dataSample);
    await TestFactories.createLikeButton(likeButton, dataSample);
  });

  afterEach(async () => {
    await LikedRestaurantIdb.deleteRestaurant(dataSample.id);
  });

  it('should display unlike button when the restaurant has been liked', async () => {
    expect(likeButton.shadowRoot.querySelector('[aria-label="unlike this restaurant"]'))
      .toBeTruthy();
  });

  it('should not display like button when the restaurant has been liked', async () => {
    expect(likeButton.shadowRoot.querySelector('[aria-label="like this restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to remove liked restaurant from the list', async () => {
    likeButton.shadowRoot.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await LikedRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await LikedRestaurantIdb.deleteRestaurant(dataSample.id);
    likeButton.shadowRoot.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await LikedRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
