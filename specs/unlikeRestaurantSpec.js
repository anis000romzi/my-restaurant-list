/* eslint-disable no-promise-executor-return */
/* eslint-disable no-undef */
import '../src/scripts/views/components/like-button';
import LikedRestaurantIdb from '../src/scripts/data/liked-restaurant-idb';

describe('Unliking A Restaurant', () => {
  const createLikeButton = async (id) => {
    const likeButton = document.createElement('like-button');
    likeButton.restaurantData = id;
    document.body.appendChild(likeButton);
  };

  beforeEach(async () => {
    await LikedRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await LikedRestaurantIdb.deleteRestaurant(1);
  });

  it('should display unlike button when the restaurant has been liked', async () => {
    await createLikeButton({ id: 1 });
    const checkButton = document.querySelector('like-button');

    checkButton.addEventListener('like-button:rendered', () => {
      expect(checkButton.shadowRoot.querySelector('[aria-label="unlike this restaurant"]'))
        .toBeTruthy();
    });
  });

  it('should not display like button when the restaurant has been liked', async () => {
    await createLikeButton({ id: 1 });
    const checkButton = document.querySelector('like-button');

    checkButton.addEventListener('like-button:rendered', () => {
      expect(checkButton.shadowRoot.querySelector('[aria-label="like this restaurant"]'))
        .toBeFalsy();
    });
  });

  it('should be able to remove liked restaurant from the list', async () => {
    await createLikeButton({ id: 1 });
    const checkButton = document.querySelector('like-button');

    checkButton.addEventListener('like-button:rendered', async () => {
      checkButton.shadowRoot.querySelector('#likeButton').dispatchEvent(new Event('click'));
      expect(await LikedRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
  });

  it('should not throw error if the unliked restaurant is not in the list', async () => {
    await createLikeButton({ id: 1 });
    const checkButton = document.querySelector('like-button');

    checkButton.addEventListener('like-button:rendered', async () => {
      await LikedRestaurantIdb.deleteRestaurant(1);
      checkButton.shadowRoot.querySelector('#likeButton').dispatchEvent(new Event('click'));
      expect(await LikedRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
  });
});
