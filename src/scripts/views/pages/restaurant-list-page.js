import RestaurantApiSource from '../../data/restaurantapi-source';

const RestaurantListPage = {
  async render() {
    return `
      <header-bar></header-bar>
      <hero-element></hero-element>
      <main tabindex="0" id="pageContent">
        <section
          id="restaurant-list"
          class="restaurant-list"
          tabindex="0"
        ><div id="loaderContainer">
          <div class="lds-ring"><div></div><div></div><div></div><div>
        </div></section>
      </main>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantApiSource.restaurants();
    const loaderElement = document.querySelector('#loaderContainer');
    const restaurantContainer = document.querySelector('#restaurant-list');
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

export default RestaurantListPage;
