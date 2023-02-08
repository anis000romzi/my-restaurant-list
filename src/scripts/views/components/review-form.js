import UrlParser from '../../routes/url-parser';
import RestaurantApiSource from '../../data/restaurantapi-source';
import RestaurantDetailPage from '../pages/restaurant-detail-page';

class ReviewForm extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this._postReviewOnSubmit();
  }

  _postReviewOnSubmit() {
    this._shadowRoot
      .querySelector('#reviewForm')
      .addEventListener('submit', async (event) => {
        event.preventDefault();
        await this._postReview();
      });
  }

  async _postReview() {
    const { id } = UrlParser.parseActiveUrlWithoutCombiner();
    const name = this._shadowRoot.querySelector('#nameInput').value;
    const review = this._shadowRoot.querySelector('#reviewInput').value;
    const reviewData = await RestaurantApiSource.reviewRestaurant({
      id,
      name,
      review,
    });
    RestaurantDetailPage.addReview(reviewData);
  }

  render() {
    this._shadowRoot.innerHTML = `
    <style>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .restaurant-detail__review__form-group {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 2px;
    }
      
    .restaurant-detail__review__form-group > label {
        width: 1%;
        flex: auto;
        padding: 1.1em 0.2em;
        text-align: center;
        background-color: rgb(255, 113, 113);
        min-width: 44px;
        min-height: 44px;
        color: #fff;
    }
      
    .restaurant-detail__review__form-control {
        padding: 1em 0.5em;
        background-color: #f3f3f3;
        border: solid 0px;
        min-width: 44px;
        min-height: 44px;
        flex: auto;
    }
      
    .restaurant-detail__review__form-button {
        border: rgb(255, 113, 113) 1px solid;
        padding: 1em 1.1em;
        color: rgb(255, 113, 113);
        background-color: #fff;
    }
      
    .restaurant-detail__review__form-button:hover {
        border: #fff 1px solid;
        color: #fff;
        background-color: rgb(255, 113, 113);
    }

    @media screen and (min-width: 500px) {
      .restaurant-detail__review__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      
      .restaurant-detail__review__form-group {
        width: 70%;
      }
      
      .restaurant-detail__review__form-group > label {
        font-size: 1.2em;
        padding: 0.8em
      }
    }
    
    @media screen and (min-width: 720px) {

      .restaurant-detail__review__form-group {
        width: 50%;
      }
    }
    </style>

    <form class="restaurant-detail__review__form" id="reviewForm">
      <div class="restaurant-detail__review__form-group name-input">
          <label for="nameInput">Name</label>
          <input id="nameInput" type="text" class="restaurant-detail__review__form-control" placeholder="Insert your name">
      </div>
      <div class="restaurant-detail__review__form-group review-input">
          <label for="reviewInput">Review</label>
          <input id="reviewInput" type="text" class="restaurant-detail__review__form-control" placeholder="Type your review here!">
      </div>
      <div class="restaurant-detail__review__form-group button-input">
          <button type="submit" id="buttonInput" class="restaurant-detail__review__form-button">Post Review</button>
      </div>
    </form>
    `;
  }
}

customElements.define('review-form', ReviewForm);
