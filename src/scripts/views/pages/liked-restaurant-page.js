import LikedRestaurantIdb from '../../data/liked-restaurant-idb';
import { errorTemplate } from '../templates/error-template';

const LikedRestaurantPage = {
  async render() {
    return `
      <main tabindex="0" id="pageContent">
        <h2 id="pageTitle">Favorite Restaurant</h2>
        <section
          id="restaurant-list"
          class="restaurant-list"
          tabindex="0"
        ></section>
      </main>
    `;
  },

  async afterRender() {
    const restaurants = await LikedRestaurantIdb.getAllRestaurants();
    const restaurantContainer = document.querySelector('#restaurant-list');

    if (restaurants.length) {
      restaurants.forEach((restaurant) => {
        const restaurantItem = document.createElement('restaurant-item');
        restaurantItem.setAttribute('id', `${restaurant.id}`);
        restaurantItem.setAttribute('tabindex', '0');
        restaurantItem.dataSource = restaurant;
        restaurantContainer.appendChild(restaurantItem);
      });
    } else {
      restaurantContainer.innerHTML = errorTemplate('You haven\'t liked any restaurant, yet.');
    }
  },
};

export default LikedRestaurantPage;
