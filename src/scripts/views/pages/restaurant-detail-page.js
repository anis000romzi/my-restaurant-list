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
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantApiSource.detailRestaurant(url.id);
    const restaurantResult = restaurant.restaurant;
    const restaurantContainer = document.querySelector('#restaurant-detail');

    if (restaurantResult) {
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurantResult);
      const restaurantLabelContainer = document.querySelector('.restaurant-detail__info__label');
      const restaurantMenuFoodsContainer = document.querySelector('#menuListFoods');
      const restaurantMenuDrinksContainer = document.querySelector('#menuListDrinks');
      const likeButton = document.createElement('like-button');
      likeButton.restaurantData = {
        id: restaurantResult.id,
        name: restaurantResult.name,
        rating: restaurantResult.rating,
        city: restaurantResult.city,
        pictureId: restaurantResult.pictureId,
        description: restaurantResult.description,
      };
      document.querySelector('#pageContainer').appendChild(likeButton);

      restaurantResult.categories.forEach((category) => {
        restaurantLabelContainer.innerHTML += `<span>#${category.name}</span>`;
      });

      restaurantResult.menus.foods.forEach((food) => {
        restaurantMenuFoodsContainer.innerHTML += `<li>${food.name}</li>`;
      });

      restaurantResult.menus.drinks.forEach((drink) => {
        restaurantMenuDrinksContainer.innerHTML += `<li>${drink.name}</li>`;
      });

      this.addReview(restaurantResult);
    } else if (restaurant.message) {
      restaurantContainer.innerHTML = errorTemplate(restaurant.message);
    } else {
      restaurantContainer.innerHTML = errorTemplate(restaurant);
    }
  },

  addReview(restaurantData) {
    const restaurantReviewsContainer = document.querySelector('.restaurant-detail__review__container');
    restaurantReviewsContainer.innerHTML = '';

    if (restaurantData.customerReviews) {
      restaurantData.customerReviews.forEach((review) => {
        restaurantReviewsContainer.innerHTML += createRestaurantReviewTemplate(review);
      });
    } else if (restaurantData.message) {
      restaurantReviewsContainer.innerHTML = errorReviewTemplate(restaurantData.message);
    } else {
      restaurantReviewsContainer.innerHTML = errorReviewTemplate(restaurantData);
    }
  },
};

export default RestaurantDetailPage;
