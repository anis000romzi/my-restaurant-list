/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
import LikedRestaurantIdb from '../src/scripts/data/liked-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking A Restaurant', () => {
  const likeButton = document.createElement('like-button');
  const dataSample = { id: 1 };

  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButton(likeButton, dataSample);

    expect(likeButton.shadowRoot.querySelector('[aria-label="like this restaurant"]'))
      .toBeTruthy();
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButton(likeButton, dataSample);

    expect(likeButton.shadowRoot.querySelector('[aria-label="unlike this restaurant"]'))
      .toBeFalsy();
  });

  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButton(likeButton, dataSample);

    likeButton.shadowRoot.querySelector('#likeButton').dispatchEvent(new Event('click'));
    const restaurant = await LikedRestaurantIdb.getRestaurant(dataSample.id);
    expect(restaurant).toEqual(dataSample);
    await LikedRestaurantIdb.deleteRestaurant(dataSample.id);
  });

  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButton(likeButton, dataSample);

    await LikedRestaurantIdb.putRestaurant(dataSample);
    likeButton.shadowRoot.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await LikedRestaurantIdb.getAllRestaurants()).toEqual([dataSample]);
    await LikedRestaurantIdb.deleteRestaurant(dataSample.id);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButton(likeButton, {});

    likeButton.shadowRoot.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await LikedRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
