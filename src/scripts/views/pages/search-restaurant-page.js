import UrlParser from '../../routes/url-parser';
import RestaurantApiSource from '../../data/restaurantapi-source';

const SearchRestaurantPage = {
  async render() {
    return `
      <main tabindex="0" id="pageContent" class="search-page">
        <search-bar></search-bar>
        <section
          id="restaurant-list"
          class="restaurant-list search-list"
          tabindex="0"
        ><div id="loaderContainer">
          <div class="lds-ring"><div></div><div></div><div></div><div>
        </div></section>
      </main>
    `;
  },

  async afterRender() {
    const genres = ['Italia', 'Modern', 'Sop', 'Jawa', 'Bali', 'Spanyol', 'Sunda'];
    const randomGenreSelector = Math.floor(Math.random() * 7);
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    // eslint-disable-next-line max-len
    const restaurants = await RestaurantApiSource.searchRestaurant(url.id || genres[randomGenreSelector]);
    const restaurantsResult = restaurants.restaurants;
    const loaderElement = document.querySelector('#loaderContainer');
    const restaurantContainer = document.querySelector('#restaurant-list');
    loaderElement.remove();

    restaurantsResult.forEach((restaurant) => {
      const restaurantItem = document.createElement('restaurant-item');
      restaurantItem.setAttribute('id', `${restaurant.id}`);
      restaurantItem.setAttribute('tabindex', '0');
      restaurantItem.dataSource = restaurant;
      restaurantContainer.appendChild(restaurantItem);
    });
  },
};

export default SearchRestaurantPage;
