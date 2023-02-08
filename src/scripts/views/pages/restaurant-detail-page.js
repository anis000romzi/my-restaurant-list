import UrlParser from '../../routes/url-parser';
import RestaurantApiSource from '../../data/restaurantapi-source';
import { createRestaurantDetailTemplate, createRestaurantReviewTemplate } from '../templates/detail-template';
import { errorReviewTemplate, errorTemplate } from '../templates/error-template';

const RestaurantDetailPage = {
  async render() {
    return `
      <main tabindex="0" id="pageContent">
        <section id="restaurant-detail"
          class="restaurant-detail"
          tabindex="0"
        ><div id="loaderContainer">
          <div class="lds-ring"><div></div><div></div><div></div><div>
        </div></section>
      </main>
    `;
  },

  async afterRender() {
    const { id } = UrlParser.parseActiveUrlWithoutCombiner();
    const { error, message, restaurant } = await RestaurantApiSource.detailRestaurant(id);
    const restaurantContainer = document.querySelector('#restaurant-detail');

    if (error === false) {
      const {
        categories,
        menus,
        customerReviews,
        ...rest
      } = restaurant;
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
      const restaurantLabelContainer = document.querySelector('.restaurant-detail__info__label');
      const restaurantMenuFoodsContainer = document.querySelector('#menuListFoods');
      const restaurantMenuDrinksContainer = document.querySelector('#menuListDrinks');
      const likeButton = document.createElement('like-button');
      likeButton.restaurantData = { ...rest };
      document.querySelector('#pageContainer').appendChild(likeButton);

      categories.forEach((category) => {
        restaurantLabelContainer.innerHTML += `<a href="#/search/${category.name}">#${category.name}</a>`;
      });

      menus.foods.forEach((food) => {
        restaurantMenuFoodsContainer.innerHTML += `<li>${food.name}</li>`;
      });

      menus.drinks.forEach((drink) => {
        restaurantMenuDrinksContainer.innerHTML += `<li>${drink.name}</li>`;
      });

      this.addReview({ error, customerReviews });
    } else {
      restaurantContainer.innerHTML = errorTemplate(message);
    }
  },

  addReview({ error, message, customerReviews }) {
    const restaurantReviewsContainer = document.querySelector('.restaurant-detail__review__container');
    restaurantReviewsContainer.innerHTML = '';

    if (error === false) {
      console.log(customerReviews);
      customerReviews.forEach((review) => {
        restaurantReviewsContainer.innerHTML += createRestaurantReviewTemplate(review);
      });
    } else {
      restaurantReviewsContainer.innerHTML = errorReviewTemplate(message);
    }
  },
};

export default RestaurantDetailPage;
