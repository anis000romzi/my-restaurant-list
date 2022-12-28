import CONFIG from '../../globals/config';

const createRestaurantDetailTemplate = (restaurant) => `
    <div class="restaurant-detail__thumbnail">
        <img src='${CONFIG.BASE_IMAGE_URL_MEDIUM}${restaurant.pictureId}' class='restaurant-detail__picture' alt='${restaurant.name}'>
        <div class="restaurant-detail__info">
            <h2 class="restaurant-detail__info__title">${restaurant.name}</h2>
            <span class="restaurant-detail__info__city">
                <i class='fa-solid fa-location-pin'></i>
                <span>${restaurant.city}</span> - ${restaurant.address}
            </span>
            <span class="restaurant-detail__info__rating">
                Rating:
                <span>
                    <i class='fa fa-heart'></i>
                    ${restaurant.rating}
                </span>
            </span>
            <div class="restaurant-detail__info__label"></div>
        </div>
    </div>
    <p class="restaurant-detail__description">${restaurant.description}</p>
    <div class="restaurant-detail__menu">
        <div class="restaurant-detail__menu__food">
            <span class="restaurant-detail__menu__title">
                <i class="fa-solid fa-burger"></i>
                FOODS
            </span>
            <ol class="restaurant-detail__menu__list" id="menuListFoods">
            </ol>
        </div>
        <div class="restaurant-detail__menu__drink">
            <span class="restaurant-detail__menu__title">
                <i class="fa-solid fa-martini-glass-citrus"></i>    
                DRINKS
            </span>
            <ol class="restaurant-detail__menu__list" id="menuListDrinks">
            </ol>
        </div>
    </div>
    <div class="restaurant-detail__review">
        <span class="restaurant-detail__review__title">Reviews</span>
        <review-form></review-form>
        <div class="restaurant-detail__review__container"></div>
    </div>
`;

const createRestaurantReviewTemplate = (review) => `
    <div class="restaurant-detail__review__item" tabindex="0">
        <div class="content">
            <span>${review.name}</span>
            <p>${review.review}</p>
        </div>
        <small>${review.date}</small>
    </div>
`;

export { createRestaurantDetailTemplate, createRestaurantReviewTemplate };
