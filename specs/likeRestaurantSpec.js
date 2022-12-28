/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
import '../src/scripts/views/components/like-button';
import LikedRestaurantIdb from '../src/scripts/data/liked-restaurant-idb';

describe('Liking A Restaurant', () => {
  const createLikeButton = async (id) => {
    const likeButton = document.createElement('like-button');
    likeButton.restaurantData = id;
    document.body.appendChild(likeButton);
  };

  it('should show the like button when the restaurant has not been liked before', async () => {
    await createLikeButton({ id: 1 });
    const checkButton = document.querySelector('like-button');

    checkButton.addEventListener('like-button:rendered', () => {
      expect(checkButton.shadowRoot.querySelector('[aria-label="like this restaurant"]'))
        .toBeTruthy();
    });
  });

  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await createLikeButton({ id: 1 });
    const checkButton = document.querySelector('like-button');

    checkButton.addEventListener('like-button:rendered', () => {
      expect(checkButton.shadowRoot.querySelector('[aria-label="unlike this restaurant"]'))
        .toBeFalsy();
    });
  });

  it('should be able to like the restaurant', async () => {
    await createLikeButton({ id: 1 });
    const checkButton = document.querySelector('like-button');

    checkButton.addEventListener('like-button:rendered', async () => {
      checkButton.shadowRoot.querySelector('#likeButton').dispatchEvent(new Event('click'));
      const restaurant = await LikedRestaurantIdb.getRestaurant(1);
      expect(restaurant).toEqual({ id: 1 });
      LikedRestaurantIdb.deleteRestaurant(1);
    });
  });

  it('should not add a restaurant again when its already liked', async () => {
    await createLikeButton({ id: 1 });
    const checkButton = document.querySelector('like-button');

    checkButton.addEventListener('like-button:rendered', async () => {
      await LikedRestaurantIdb.putRestaurant({ id: 1 });
      checkButton.shadowRoot.querySelector('#likeButton').dispatchEvent(new Event('click'));
      expect(await LikedRestaurantIdb.getAllRestaurants()).toEqual([{ id: 1 }]);
      LikedRestaurantIdb.deleteRestaurant(1);
    });
  });

  it('should not add a restaurant when it has no id', async () => {
    await createLikeButton({});
    const checkButton = document.querySelector('like-button');

    checkButton.addEventListener('like-button:rendered', async () => {
      checkButton.shadowRoot.querySelector('#likeButton').dispatchEvent(new Event('click'));
      expect(await LikedRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
  });
});
