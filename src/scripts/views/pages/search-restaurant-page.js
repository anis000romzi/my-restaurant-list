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
    const genresPool = ['Italia', 'Modern', 'Sop', 'Jawa', 'Bali', 'Spanyol', 'Sunda'];
    const randomGenre = genresPool[Math.floor(Math.random() * genresPool.length)];
    const { id } = UrlParser.parseActiveUrlWithoutCombiner();

    const searchBar = document.querySelector('search-bar');
    const { restaurants } = await RestaurantApiSource.searchRestaurant(id || randomGenre);
    const loaderElement = document.querySelector('#loaderContainer');
    const restaurantContainer = document.querySelector('#restaurant-list');

    searchBar.shadowRoot.querySelector('#searchInput').value = id ? id.replace(/%20/g, ' ') : '';

    loaderElement.remove();

    restaurants.forEach((restaurant) => {
      const restaurantItem = document.createElement('restaurant-item');
      restaurantItem.setAttribute('id', `${restaurant.id}`);
      restaurantItem.setAttribute('tabindex', '0');
      restaurantItem.dataSource = restaurant;
      restaurantContainer.appendChild(restaurantItem);
    });
  },
};

export default SearchRestaurantPage;
